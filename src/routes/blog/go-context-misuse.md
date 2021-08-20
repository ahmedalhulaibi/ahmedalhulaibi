---
title: 'Golang context.Context is not for dependency injection'
excerpt: "Golang's context.Context is useful, but can be easily misused"
date: '2021-08-17T05:35:07.322Z'
author: Ahmed Al-Hulaibi
---

Generally, `context.Context` is used to propagate cancellation signals, deadlines, and request-scoped values.

The definition of request-scoped is often stretched to **anything needed to process this request.** My personal pet peeve is seeing it used for dependency injection.

I have learned the hard way (not by choice) to **avoid using `context.Context` for dependency injection and shared state that alters behaviour.** 

Using `context.Context` as a dependency injection and/or shared state object is confusing for maintainers and consumers of a package. In my experience the problem with using `context.Context` for dependency injection is that it:

- **[Obfuscates inputs](#obfuscated-inputs)** when reading method and function signatures.
- **[Creates implicit coupling](#implicit-and-unclear-temporal-coupling)** which slows down maintenance.
- **[Leads to nil pointer exceptions](#nil-pointer-exceptions)** causing development delays and service disruptions.

## Obfuscated inputs

Say we have a service method which requires a `Logger` as input.

```go
// package user
func (s service) GetUserByID(ctx context.Context, logger log.Logger, id int64) (*User, error) {
  logger.Info("I will never execute if I am nil")
} 

// package main

func main() {
  userService := users.NewService()
  logger := log.NewLogger()
  u, err := user.GetUserByID(context.Background(), logger, 1)
  //...
}
```

It seems somewhat tedious to have to pass in the logger every time we want to fetch a user and is making things more complicated.

Below is an example of how I have seen `context.Context` used to solve this problem. The intent is to design `service.GetUserByID` so that it is easier to consume. By propagating a frequently used object `logger` through shared state `context.Context` we don't have to force all of our method signatures to define `logger` as a parameter.

```go
// package user
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := context.Value("logger").(log.Logger)

  logger.Info("I will never execute if I am nil")
} 

// package main

func main() {
  svc := service.New()
  ctx := context.WithValue(context.Background(), "logger" /*context key*/, log.NewLogger())
  u, err := svc.GetUserByID(ctx, 1)
  //...
}
```

Looks great! Now I don't have to pass in the `logger` as a separate input. It is less complicated, right? Not really.

We have shifted the complexity from the method signature and hidden it behind an obscure object.

I think it is worse than before. The complier and GoDoc will tell us this method only requires 2 input parameters. This is a lie. It only _appears_ as though it required 2 inputs. This method clearly requires 3 inputs, or it will not run as expected. There is an implicit temporal coupling, but it is not communicated in the method signature. This will have more consequences. 

## Implicit and unclear temporal coupling

Using our example above, there is nothing to communicate to the compiler or through GoDoc that there is an expected input hidden in `context.Context`.

In reality, first we have to run some logic to inject the `logger` into `context.Context` and only then can we safely invoke the service method. This is a coupling in the temporal dimension. `A` must invoke `B` before invoking `C`.

This can become a hurdle when refactoring. Typically `context.Context` is propagated through the entire stack, but not all methods/functions use all the values in `context.Context`. This can lead to implicit couplings deep in a stack where say function `A` injects a value into context, then calls `B` which calls `C` and so on until `Z` extracts the value. `A` and `Z` are temporally coupled. Remove `A` and now any caller to `Z` breaks with a nil pointer exception.

## Nil pointer exceptions

Looking at our original example (listed again below), it's been established that this implementation has **obfuscated the inputs to the method**.

```go
// package user
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := context.Value("logger").(log.Logger)

  logger.Info("I will panic")
} 

// package main

func main() {
  svc := service.New()
  u, err := svc.GetUserByID(context.Background(), 1)
  //...
}
```

The above implementation will compile even though we failed to set our `logger` in `context.Context`. How is a reader supposed to know that there was a specific value, `logger`, expected? The only way to know would be to read the implementation or wait to run into an nil pointer exception to uncover the truth.

If this slips into a live environment it will cause disruptions for you, your colleagues and worst of all your customers.

## How can we fix this?

The best 2 solutions I use are:

1. Dependency Injection for service-wide dependencies like `logger` and `sql.DB`
2. Explicitly define input parameters

Let's walk through the same example with our `logger` and go through some alternatives. 

### Tests won't work

We could catch these exceptions through tests but if someone has decided to use a mock, they will not necessarily mock the context values correctly and will be surprised later on.

### Defensive programming won't work in practice

We could avoid the exception using defensive programming with a type assertion and return an error in case the logger is not set.

This avoids the nil pointer exception but the method signature is still misleading readers to believe there are only 2 required inputs. In practice, the error will bubble up and likely result in the same error for our users and still cause service disruptions.

```go
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger, ok := context.Value("logger").(log.Logger)
  if logger == nil || !ok {
    return nil, fmt.Errorf("logger must be set in context")
  }

  logger.Info("I will never execute if I am nil")
}
```

### Fallback to a default value
At the very least, if `logger` is expected but not found, we could fallback to some default value. Abstracted it into an accessor function.

```go
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
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

What would be better is if the `logger` was injected directly into the `service` through a factory function. The `logger` is a service dependency. It is likely that it will be used across many or all methods of our service.

In the example below, the `New` factory function signature clearly communicates the expected service dependencies. At this point we can decide how to handle a `nil` logger. This also solves the issue around making our service method easier to use, since we no longer have to provide the `logger` as an input to every method. It also better communicates temporal coupling

```go
type service struct {
  logger log.Logger
}

func New(logger log.Logger, opts ...func(*service)) (*service, error) {
  // We could check if logger is nil, and return an error
  if logger == nil {
    return nil, fmt.Errorf("logger must not be nil")
  }
  // We could fallback to a default logger
  if logger == nil {
    logger = log.NewLogger()
  }
  // We could use functional options here to set a default logger,
  // and inject and overwrite the default with our own with an option
  logger = log.NoopLogger()
  for _, opt := range opts {
    opt(service)
  }

  return &service{
    logger: logger,
  }, nil
}

func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  s.logger.Info("I will never fail now")
}
```
## How to use `context.Context` correctly

My advice at time of writing would be to limit usage to:
- Cancellation signals
- Deadlines
- Request-scoped metadata that does not alter behaviour

For service-wide dependencies like `sql.DB` or loggers, use dependency injection. Avoid hiding dependencies in `context.Context` to minimize run-time exceptions and make your code easier to read.

Any values required as inputs to functions and methods should be defined explicitly as input parameters.

> ### Hold on, isn't a logger request-scoped?
>
> From my perspective, no. Frequently I have come across the pattern where a logger is instantiated with request-scoped fields and propagated through `context.Context` so that all logs written related to that request report with the request-scoped metadata.
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