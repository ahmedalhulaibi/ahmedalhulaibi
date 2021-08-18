---
title: 'Golang context.Context: Identifying misuse'
excerpt: "Golang's context.Context is useful, but can be easily misused"
date: '2021-08-17T05:35:07.322Z'
author: Ahmed Al-Hulaibi
---

Generally, `context.Context` is used to propagate cancellation signals, deadlines, and request-scoped values.

The request-scoped values use case in particular is where I have experienced pain. The definition of request-scoped gets stretched to **anything needed to process this request.**

I have learned the hard way (not by choice) to **avoid using `context.Context` for dependency injection and shared-state.** 

The main problem I want to highlight when `context.Context` is that it **obfuscates inputs** when reading method signatures leading to development delays, nil pointers, and confusion.

## Obfuscating Inputs

Below is an example of how I have seen `context.Context` used. The intent is to design `service.GetUserByID` so that it is easier to consume. By propagating a frequently used object `logger` through shared-state `context.Context` we don't have to force all of our method signatures to define `logger` as a parameter.

```go
// package user
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := context.Value("logger").(Logger)

  //... do stuff with nil logger, leading to panic
  logger.Info("I will never execute if I am nil")
} 

// package main

func main() {
  userService := users.NewService()
  u, err := user.GetUserByID(context.Background(), 1)
  //...
}
```

While the intent is noble, this does not make this method easier to consume. The complier and godoc will tell us this method only requires 2 input parameters. This is a lie. It only _appears_ as though it required 2 inputs. This method clearly requires 3 inputs, or it will not run as expected.

We have only shifted the complexity to an obscure object.

If you use `context.Context` as a catch-all dependency injection tool, you will not be able to communicate function or method inputs clearly. Aside from affecting readability, in my experience this frequently leads to nil pointer exceptions.

### Nil Pointer Exceptions

Looking at our original example (listed below), it's been established that this implementation has **obfuscated the inputs to the method**.

```go
// package user
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := context.Value("logger").(Logger)

  //... do stuff with nil logger, leading to panic
  logger.Info("I will never execute if I am nil")
} 
```

How is a reader supposed to know that there was a specific value `logger` expected in context? The above implementation would compile if we failed to setup `context.Context`. We would have to read the implementation or wait to run into an nil pointer exception to uncover the truth.

If this slips into a live environment, it will cause disruptions for you, your colleagues and your customers.

## How can we fix this?

I have observed and tried many workarounds to avoid a full refactor but only two actual solutions exist

1. Dependency Injection for service dependencies like `logger` and `sql.DB`
2. Explicitly define input parameters. Use the `Builder` pattern if there is a complex or large set of related inputs required.

Let's walkthrough the same example with our `logger` and go through the alternatives. 

### Tests won't work

We could catch these exceptions through tests but if someone has decided to mock this method they likely will not mock the context values correctly and will be surpised later on.

### Defensive Programming won't work in practice

We could avoid the exception using defensive programming with a type assertion

```go
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger, ok := context.Value("logger").(Logger)
  if logger == nil || !ok {
    return nil, fmt.Errorf("logger must be set in context")
  }

  logger.Info("I will never execute if I am nil")
}
```

This avoids the nil pointer exception but still fails to communicate that there is an input expected. The method signature is still misleading. In practice, the error will bubble up and likely result in the same error for our users and still cause service disruptions.

### Fallback to default value
At the very least, if `logger` is expected but not found, we could fallback to some default.

```go
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger := extractLogger(ctx)

    //... do stuff with nil logger, leading to panic
  logger.Info("I will never execute if I am nil")

}

func extractLogger(ctx context.Context) Logger {
logger, ok := context.Value("logger").(Logger)
  if logger == nil || !ok {
    return log.New()
  }
}
```
### Dependency Injection is best

What would be better is if the `logger` was injected directly into the `service` through a constructor. The `logger` is a service dependency. It is likely that it will be used across all methods of our service.

In the example below, the `New` function signature clearly communicates the expected service dependencies. At this point we can decide how to handle a `nil` logger. This also solves the issue around making our service method easier to use, since we no longer have to provide `logger` as an input.

```go
type service struct {
  logger Logger
}

func New(logger Logger) (service) {
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

For service wide dependencies `sql.DB` or `logger`, use dependency injection. Avoid hiding behind shared-state like `context.Context` to minimize run-time exceptions.

**Any values required as inputs to functions and methods should be defined explicitly.**

___
## References

Below are resources I have leveraged for my work in reference to how `context.Context` should be used.

 - [The Go Blog - Go Concurrency Patterns: Context](https://blog.golang.org/context)
 - [How to use context.Context correctly in Go 1.7](https://medium.com/@cep21/how-to-correctly-use-context-context-in-go-1-7-8f2c0fafdf39)
 - [Dave Cheney - Context is for cancelation](https://dave.cheney.net/2017/01/26/context-is-for-cancelation)
 - [Dave Cheney - Context isn't for cancelation](https://dave.cheney.net/2017/08/20/context-isnt-for-cancellation)
 - [The Go Blog - Context and structs](https://blog.golang.org/context-and-structs)
