---
title: 'Golang context.Context: Identifying misuse'
excerpt: "Golang's context.Context is useful, but can be easily misused"
date: '2021-08-17T05:35:07.322Z'
author: Ahmed Al-Hulaibi
---

Generally, `context.Context` is used to propagate cancellation signals, deadlines, and request-scoped values.

The request-scoped values use case in particular is where I have experienced pain. The definition of request-scoped gets stretched to **anything needed to process this request.**

I have learned the hard way (not by choice) to **avoid using `context.Context` for dependency injection and shared-state.** 

The main problem I want to highlight is that `context.Context` **obfuscates inputs** when reading method signatures. Using `context.Context` as a dependency injection and/or shared-state object is confusing. In my experience, it has lead to development delays and service disruptions.

## Obfuscating Inputs

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

Below is an example of how I have seen `context.Context` used to solve this problem. The intent is to design `service.GetUserByID` so that it is easier to consume. By propagating a frequently used object `logger` through shared-state `context.Context` we don't have to force all of our method signatures to define `logger` as a parameter.

```go
// package user
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := context.Value("logger").(log.Logger)

  logger.Info("I will never execute if I am nil")
} 

// package main

func main() {
  userService := users.NewService()
  ctx := context.WithValue(context.Background(), "logger" /*context key*/, log.NewLogger())
  u, err := user.GetUserByID(ctx, 1)
  //...
}
```

Looks great! Now I don't have to pass in the logger as a separate input. It is less complicated, right? Not really.

I think it is worse than before. The complier and godoc will tell us this method only requires 2 input parameters. This is a lie. It only _appears_ as though it required 2 inputs. This method clearly requires 3 inputs, or it will not run as expected. There is an implicit Temporal Coupling, but it is not communicated anywhere except the implementation.

We have shifted the complexity from the method signature and hidden it behind an obscure object.

If you use `context.Context` as a catch-all dependency injection tool, you will not be able to communicate function or method inputs clearly.

Aside from affecting readability, in my experience this frequently leads to nil pointer exceptions.

### Nil Pointer Exceptions

Looking at our original example (listed below), it's been established that this implementation has **obfuscated the inputs to the method**.

```go
// package user
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := context.Value("logger").(log.Logger)

  logger.Info("I will never execute if I am nil")
} 

// package main

func main() {
  userService := users.NewService()
  u, err := user.GetUserByID(context.Background(), 1)
  //...
}
```

The above implementation will compile even though we failed to set our `logger` in `context.Context`. How is a reader supposed to know that there was a specific value, `logger`, expected? The only wat to know would be to read the implementation or wait to run into an nil pointer exception to uncover the truth.

If this slips into a live environment, it will cause disruptions for you, your colleagues and worst of all your customers.

## How can we fix this?

The best 2 solutions I use are:

1. Dependency Injection for service-wide dependencies like `logger` and `sql.DB`
2. Explicitly define input parameters. Use the `Builder` pattern if there is a complex or large set of related inputs required.

Let's walkthrough the same example with our `logger` and go through the alternatives. 

### Tests won't work

We could catch these exceptions through tests but if someone has decided to mock this method they likely will not mock the context values correctly and will be surpised later on.

### Defensive Programming won't work in practice

We could avoid the exception using defensive programming with a type assertion and return an error in case the logger is not set.

```go
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger, ok := context.Value("logger").(log.Logger)
  if logger == nil || !ok {
    return nil, fmt.Errorf("logger must be set in context")
  }

  logger.Info("I will never execute if I am nil")
}
```

This avoids the nil pointer exception but the method signature is still misleading readers to believe there are only 2 required inputs. In practice, the error will bubble up and likely result in the same error for our users and still cause service disruptions.

### Fallback to default value
At the very least, if `logger` is expected but not found, we could fallback to some default.

```go
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := extractLogger(ctx)

    //... do stuff with nil logger, leading to panic
  logger.Info("I will never execute if I am nil")

}

func extractLogger(ctx context.Context) log.Logger {
logger, ok := context.Value("logger").(log.Logger)
  if logger == nil || !ok {
    return log.New()
  }
}
```
### Dependency Injection Is Best

What would be better is if the `logger` was injected directly into the `service` through a constructor. The `logger` is a service dependency. It is likely that it will be used across many or all methods of our service.

In the example below, the `New` function signature clearly communicates the expected service dependencies. At this point we can decide how to handle a `nil` logger. This also solves the issue around making our service method easier to use, since we no longer have to provide `logger` as an input.

```go
type service struct {
  logger log.Logger
}

func New(logger log.Logger) (service) {
  // ... validation to check if logger is nil, can fallback to a default logger
  return service{
    logger: logger,
  }
}

func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  s.logger.Info("I will never execute if I am nil")
}
```

## How to use `context.Context` correctly

My advice at time of writing would be to limit usage to:
- Cancellation singals
- Deadlines
- Request-scoped metadata that does not alter behaviour

For service-wide dependencies like `sql.DB` or `logger`, use dependency injection. Avoid hiding behind shared-state like `context.Context` to minimize run-time exceptions and make your code easier to read.

Any values required as inputs to functions and methods should be defined explicitly as input parameters.

___
## References

Below are resources I have leveraged for my work in reference to how `context.Context` should be used.

 - [The Go Blog - Go Concurrency Patterns: Context](https://blog.golang.org/context)
 - [How to use context.Context correctly in Go 1.7](https://medium.com/@cep21/how-to-correctly-use-context-context-in-go-1-7-8f2c0fafdf39)
 - [Dave Cheney - Context is for cancelation](https://dave.cheney.net/2017/01/26/context-is-for-cancelation)
 - [Dave Cheney - Context isn't for cancelation](https://dave.cheney.net/2017/08/20/context-isnt-for-cancellation)
 - [The Go Blog - Context and structs](https://blog.golang.org/context-and-structs)
