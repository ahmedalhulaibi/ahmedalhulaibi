---
title: 'Golang context.Context is not for dependency injection'
excerpt: "Golang's context.Context is useful, but can be easily misused"
date: '2021-08-17T05:35:07.322Z'
author: Ahmed Al-Hulaibi
---

Generally, `context.Context` is used to propagate cancellation signals, deadlines, and request-scoped values.

The definition of request-scoped is often stretched to **anything needed to process this request.** My personal pet peeve is seeing it used for dependency injection.

I have learned the hard way (not by choice) to **avoid using `context.Context` for dependency injection and shared state that alters behaviour.** 

Using `context.Context` as a dependency injection and/or shared state object is confusing for maintainers and consumers of a package. In my experience this results in the following side effects:

- **[Obfuscates inputs](#obfuscated-inputs)** when reading method and function signatures.
- **[Creates implicit coupling](#implicit-and-unclear-temporal-coupling)** which slows down maintenance.
- **[Leads to nil pointer exceptions](#nil-pointer-exceptions)** causing development delays and service disruptions.

## Example

Say we have a service method which requires a `*sql.DB` as input.

```go
// package user
func (s Service) GetUserByID(ctx context.Context, db *sql.DB, id int64) (*User, error) {
  row := db.QueryRowContext(ctx, "select * from users where id = $1", id)
  // stuff with row
} 

// package main

func main() {
  db, err := sql.Open("driver-name", *dsn)
  if err != nil {
    // ...
  }
  defer db.Close()

  svc := user.NewService()
  u, err := svc.GetUserByID(context.Background(), db, 1)
  //...
}
```

It seems somewhat tedious to have to pass in `sql.DB` every time we want to fetch a user.

Below is an example of how I have seen `context.Context` used to solve this problem. The intent is to design `service.GetUserByID` so that it is easier to consume. By propagating a frequently used object `sql.DB` through shared state `context.Context` we don't have to force all of our method signatures to define `sql.DB` as a parameter. This is a form of Dependency Injection.

```go
// package user
func (s Service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  db := context.Value("db").(*sql.DB)

  row := db.QueryRowContext(ctx, "select * from users where id = $1", id)
} 

// package main

func main() {
  db, err := sql.Open("driver-name", *dsn)
  if err != nil {
    // ...
  }
  defer db.Close()

  ctx := context.WithValue(context.Background(), "sql.DB" /*context key*/, db)

  svc := user.NewService()
  u, err := svc.GetUserByID(ctx, 1)
  //...
}
```

Looks great! Now I don't have to pass in the `sql.DB` as a separate input. It is less complicated, right? Not really.

## Obfuscated inputs

We have shifted the complexity from the method signature and hidden it behind an obscure object `context.Context`. Let's look at the method signature.

```go
func (s Service) GetUserByID(ctx context.Context, id int64) (*User, error)
```

The complier and GoDoc will tell us this method only requires 2 input parameters. This is not true. It only _appears_ as though it requires 2 inputs. This method clearly requires 3 inputs, or it will not run as expected. One of the inputs is obfuscated behind `context.Context` but it is not communicated in the method signature. This will have more consequences. 

## Implicit and unclear temporal coupling

Using our example, there is nothing to communicate to the compiler or through GoDoc that the method expects `sql.DB` to be passed in through `context.Context`.

```go
func (s Service) GetUserByID(ctx context.Context, id int64) (*User, error)
```

In reality, first we have to run some logic to instantiate `sql.DB`, then more logic to inject the `sql.DB` into `context.Context`. Only then can we safely invoke the service method. This is a coupling in the temporal dimension. `A` must invoke `B` before invoking `C`.

This can become a hurdle when refactoring. Typically `context.Context` is propagated through the entire stack, but not all methods/functions use all the values in `context.Context`. This can lead to implicit couplings deep in a stack where say function `A` injects `sql.DB` into context, then calls `B` which calls `C` and so on until `Z` extracts the value. Functions `B` all the way to `Y` don't depend on `sql.DB`, but `A` and `Z` are temporally coupled. Remove `A` and now any caller to `Z` breaks with a nil pointer exception.

## Nil pointer exceptions

Looking at our original example with obfuscated inputs (listed again below), it has been established that this implementation has **obfuscated the inputs to the method**.

```go
// package user
func (s Service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  db := context.Value("db").(*sql.DB)

  row := db.QueryRowContext(ctx, "select * from users where id = $1", id)
} 

// package main

func main() {
  svc := user.NewService()
  u, err := svc.GetUserByID(ctx, 1)
  //...
}
```

The above implementation will compile even though we failed to set our `sql.DB` in `context.Context`. How is a reader supposed to know that there was a specific value, `sql.DB` expected in `context.Context`? The only way to know would be to read the implementation or wait to run into an nil pointer exception to uncover the truth.

In a small codebase, it may be easy to read the implementation you're invoking. But if you have a very large codebase or framework that relies on this pattern it is likely doing more harm than good.

On top of the issues around readability and maintainability, if a nil pointer exception like this slips into a live environment it will cause disruptions for you, your colleagues and worst of all your customers.

## How can we fix this?

The best 2 solutions I use are:

1. Dependency Injection for service-wide dependencies like `logger` and `sql.DB`
2. Explicitly define input parameters

Let's walk through all the options though. 


### Code Review won't always work

We could catch these issues in code review, but in practice people make mistakes. If you're adding a new dependency via `context.Context` a reviewer could miss one critical path. In practice, that critical path may not even appear in a diff since the changes would not affect any function/method signatures.

### Tests won't work

We could catch these exceptions through tests. In practice this has a few issues:

1. Slowing down development time as we have to wait for tests to fail
2. If someone has decided to use a mock, they will not necessarily mock the context values correctly and will be surprised when using the concrete implementation.
3. There is no guarantee that someone will write a test for every critical path.

In my experience, trying to catch errors in this scenario (using `context.Context` for dependency injection) just doesn't always work.

### Defensive programming won't work in practice

We could avoid the exception using defensive programming with a type assertion and return an error early.

This avoids the nil pointer exception but the method signature is still misleading readers to believe there are only 2 required inputs. In practice, the error will bubble up and likely result in the same error for our users and still cause service disruptions.

```go
func (s Service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  db, ok := context.Value("db").(*sql.DB)
  if db == nil || !ok {
    return nil, fmt.Errorf("db must be set in context")
  }

// ...
}
```

### Fallback to a default value

Instead of returning an error, we could try to fallback to a default value. In practice, I don't see how this could work in a clean way for `sql.DB` unless the connection string is propagated as well (which brings us back to our original problem). This opens up more risks in the case of `sql.DB` to issues like leaking connections.

Below is an example if we had another dependency, `Logger` propagated through `context.Context` and wanted to make sure there was always a `Logger` available 

```go
func (s Service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := extractLogger(ctx)

  logger.Info("I will never fail now")
}

func extractLogger(ctx context.Context) log.Logger {
  logger, ok := context.Value("logger").(log.Logger)
  if logger == nil || !ok {
    return log.New()
  }
}
```
### Dependency injection is best

What would be better is if the reference to `logger` and `sql.DB` was injected directly into the `service` through a factory function. `sql.DB` and `logger` are service dependencies. It is likely that they will be used across many or all methods of our service.

In the example below, the `NewService` factory function signature clearly communicates the expected service dependencies. The factory function can validate the inputs explicitly. This also solves the issue around making our service method easier to use, since we no longer have to provide `logger` or `sql.dB` as an input to every method. It also better communicates temporal coupling as our factory explicitly states its inputs.

```go
type Service struct {
  logger log.Logger
  db     *sql.DB
}

func NewService(db *sql.DB, logger log.Logger, opts ...func(*service)) (*Service, error) {
  if db == nil {
    return nil, fmt.Errorf("db must not be nil")
  }

  // We could check if logger is nil, and return an error
  if logger == nil {
    return nil, fmt.Errorf("logger must not be nil")
  }
  // We could fallback to a default logger
  if logger == nil {
    logger = log.NewLogger()
  }

  // We could omit `logger` from the signature entirely and set a default logger
  // We could use functional options to allow injecting an override
  logger = log.NoopLogger()
  for _, opt := range opts {
    opt(service)
  }

  return &Service{
    logger: logger,
    db:     db,
  }, nil
}

func (s Service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  s.db.Query(/*...*/)
  s.logger.Info("I will never fail now")
}

// package main

func main() {
  db, err := sql.Open("driver-name", *dsn)
  if err != nil {
    log.Fatal(err)
  }
  defer db.Close()

  svc := user.NewService(db)
  u, err := svc.GetUserByID(context.Background(), 1)
  //...
}
```
## How to use `context.Context` correctly

My advice at time of writing would be to limit usage to:
- Cancellation signals
- Deadlines
- Request-scoped metadata that does not alter behaviour

## Use Explicit Dependency Injection

My preference is to leverage the compiler as much as possible and be explicit about expected inputs.

Any values required as inputs to functions and methods should be defined explicitly as input parameters. When methods have many required inputs, lean on composing related inputs with the factory and builder pattern.

For service-wide dependencies like `sql.DB` or loggers, use dependency injection. Avoid hiding dependencies in `context.Context` to minimize run-time exceptions and make your code easier to read.


> ### Hold on, isn't a logger request-scoped?
>
> From my perspective, no. Frequently I have come across the pattern where a logger is instantiated with request-scoped fields and propagated through `context.Context`. All logs written using this request-scoped logger report with the request-scoped metadata.
>
> While the pattern is well established, it is not necessary. A logger can be implemented to look for specific keys in `context.Context` and extract these values every time a message is logged.
>
> I have a work-in-progress logger implementation that works like this [here](https://github.com/ahmedalhulaibi/loggy).

___
## Further Reading

 - [The Go Blog - Go Concurrency Patterns: Context](https://blog.golang.org/context)
 - [How to use context.Context correctly in Go 1.7](https://medium.com/@cep21/how-to-correctly-use-context-context-in-go-1-7-8f2c0fafdf39)
 - [Dave Cheney - Context is for cancelation](https://dave.cheney.net/2017/01/26/context-is-for-cancelation)
 - [Dave Cheney - Context isn't for cancelation](https://dave.cheney.net/2017/08/20/context-isnt-for-cancellation)
 - [The Go Blog - Context and structs](https://blog.golang.org/context-and-structs)
 - [Dave Cheney - Functional options for friendly APIs](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis)
 - [Rob Pike - Self-referential functions and the design of options](https://commandcenter.blogspot.com/2014/01/self-referential-functions-and-design.html)
 - [Design Smell: Temporal Coupling](https://blog.ploeh.dk/2011/05/24/DesignSmellTemporalCoupling/)