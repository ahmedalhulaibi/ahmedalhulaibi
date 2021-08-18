---
title: 'Golang context.Context: Identifying misuse'
excerpt: "Golang's context.Context interface is useful, but can be easily misused"
date: '2021-08-17T05:35:07.322Z'
author: Ahmed Al-Hulaibi
---

Generally, `context.Context` is used to propagate cancellation signals, deadlines, and request-scoped values.

The request-scoped values use case in particular is where I have experienced pain. The definition of request-scoped gets stretched to **anything needed to process this request.**

I have learned the hard way (not by choice) to **avoid using `context.Context` for dependency injection and other explicit inputs.** 

The main problem I want to highlight when `context.Context` is that it **obfuscates inputs** when reading method signatures leading to delays, nil pointers, and confusion

## Obfuscating Inputs

I have seen the following propagated through `context.Context` and custom context objects
- `*sql.DB`
- `*sql.Tx`
- Logger implementations
- User objects
- Localization Locale

`context.Context` is used this way as a catch-all dependency injection mechanism. The intent is usually to hide complexity but it leads to misleading function and method signatures and frequently leads to nil pointer exceptions.

Below is a simple example:

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

The intent here is to make `service.GetUserByID` easier to consume. This is an indirection as opposed to a solution.

This implementation has **obfuscated the inputs to the method**. How is a reader supposed to know that there was a specific value `logger` expected in context? The above implementation bypasses compile-time checks. We would have to read the implementation or wait to run into an nil pointer exception to uncover the truth.

If this slips into a live environment, it will cause disruptions for you, your colleagues and your customers.

We could catch these exceptions through tests but if someone has decided to mock this method they likely will not mock the context values correctly and will be surpised later on.

We could avoid the exception with some defensive programming:

```go
func (s service) GetUserByID(ctx context.Context, id int64) (*User, error) {
  logger, ok := context.Value("logger").(Logger)
  if logger == nil || !ok {
    return nil, fmt.Errorf("logger must be set in context")
  }

  logger.Info("I will never execute if I am nil")
}
```

This avoids the nil pointer exception but still fails to communicate that there is an input expected. This changes little in terms of improving readability or documentation. The method signature is still misleading. The error will just bubble up and likely result in the same error for our users and still require making a change.

At the very least, if something like this is expected and is not actually request scoped, fallback to some default.

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

But what would be better is if the `logger` was injected directly into the `service`

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

The `New` function signature clearly communicates the expected service dependencies. 

## How to use `context.Context` correctly

My advice at time of writing would be to limit usage to:
- Cancellation singals
- Deadlines
- Request-scoped metadata that does not alter behaviour

**Any values required as inputs to functions and methods should be defined explicitly.**

Below are resources I have leveraged for my work in reference to how `context.Context` should be used.

 - [The Go Blog - Go Concurrency Patterns: Context](https://blog.golang.org/context)
 - [How to use context.Context correctly in Go 1.7](https://medium.com/@cep21/how-to-correctly-use-context-context-in-go-1-7-8f2c0fafdf39)
 - [Dave Cheney - Context is for cancelation](https://dave.cheney.net/2017/01/26/context-is-for-cancelation)
 - [Dave Cheney - Context isn't for cancelation](https://dave.cheney.net/2017/08/20/context-isnt-for-cancellation)
 - [The Go Blog - Context and structs](https://blog.golang.org/context-and-structs)
