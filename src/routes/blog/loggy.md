---
title: 'Stop using context for loggers by using context for loggers'
excerpt: "A better way to consume contextual loggers"
date: '2021-11-01T23:52:07.322Z'
author: Ahmed Al-Hulaibi
---

# Contextual logging

Many of the code bases I have seen inject a logger into `context.Context`. While this is an anti-pattern, the reason for this is that there are request-scoped values that they want present with every log message.
    
    - Request or Trace IDs for correlation
    - User IDs for quick debugging
    - IP address
    - Host IP
    - Instance ID

A quick (but not thorough) Google search returns a few examples in the Go community that encourage injecting a logger into `context.Context` for this reason.

- [Distributed request logging in Go with context API](https://medium.com/swlh/distributed-request-logging-in-go-with-context-api-16040688ed36)
- [Using Go's context library for logging](https://medium.com/@gosamv/using-gos-context-library-for-logging-4a8feea26690)
- [Passing loggers in Go](https://gogoapps.io/blog/passing-loggers-in-go-golang-logging-best-practices/)
- [Zerolog - Pass a sub-logger by context](https://github.com/rs/zerolog#pass-a-sub-logger-by-context)

The way I usually see this implemented is that a middleware creates a contextual logger and injects that into `context.Context`. When a dependency needs a logger, it extracts it from `context.Context`.

```go
log := ctx.Value("logger").(log.Logger)
log.Warn("something you'll ignore later")
```

A couple of disadvantages of the above snippet that bother me:
- The risk of nil pointer exceptions leading to panics in untested branches of code. I can't count the number of times this has happened to me and my colleagues.
- When service dependencies are injected through `context.Context` they can be tedious to mock for tests.

There are posts and forum threads that explain the disadvantages to injecting service dependencies via `context.Context`
- [Context is for cancellation](https://dave.cheney.net/2017/01/26/context-is-for-cancelation)
- [Loggers should be injected into dependencies. Full stop.](https://groups.google.com/g/golang-dev/c/F3l9Iz1JX4g/m/2TpGYsTkAQAJ)

One gap I see is that logging libraries and community posts don't demonstrate how we can inject a logger as a (decoupled) service dependency __and__ write log messages with request-scoped values **without** passing a logger around and/or repeating arguments.

# Better contextual logging

I propose that we wrap existing logging libraries to change their APIs slightly for real-world use-cases.

- Loggers should accept `context.Context` as an input parameter and extract logging context from the given `context.Context`.
- This way we can still write log messages with request-scoped values and inject the logger into service dependencies and decouple our packages.

The overhead for logging can be significant so the implementation matters, but I set out with the hope that this behaviour could be added at a minimal cost to performance.

I decided to start with Uber's `zap` which is the fastest logging library I knew of at the time. I specifically focused on the `zap.SugaredLogger`.

My first iteration of this idea was to wrap `zap.SugaredLogger`, and for each method accept a `context.Context` and configure my wrapper to search `context.Context` for specific keys, one for each possible request-scoped value we want in logging context. This was slow. 
    
- [Link to commit](https://github.com/ahmedalhulaibi/loggy/tree/90e7719d78cd8339dd14ee9850f1799e45257348)
- The logger is configured to search for context keys using `log.WithFields`
- The logger methods accept `context.Context`.
- For every message logged:
    - I searched for every configured field in a given `context.Context` and allocated a new slice of all found keys and their values. I merged the request-scoped fields with dynamic arguments and then logged the message.
    - It was more than 6 times slower and resulted in 10x the allocations for the given benchmark use case.

My second iteration, I decided a middle-ground would probably be more appropriate.
    
- [Link to commit](https://github.com/ahmedalhulaibi/loggy/tree/master)
- The logger methods accept `context.Context`.
- The logging context is set the same way most libraries recommend `log.WithFields` or similar and the returned contextual logger is injected in `context.Context`.
- If a contextual logger exists in `context.Context`, my logger writes using the contextual logger. Otherwise, it defaults to itself.

This put the performance essentially on-par with the underlying `zap` logger in a happy-path use-case and enabled me to break away from using `context.Context` for dependency injection.

The main improvement that my implementation offers is in the use-case where there is no logger in `context.Context`.
    
- It improves reliability since it does not panic if an assertion for a contextual logger fails.
- It improves performance since it does not need to allocate a new logger when a contextual logger does not exist.
    - A counter-argument is that I could declare a package scoped logger to fallback on to reduce allocations in the use case where a contextual logger does not exist. The only issue I have with this is that expects that we would be using `context.Context` to pass along service dependencies, which is what I want to avoid.
- It decouples the logging context from the logger, which allows us to inject the logger as a service dependency but still log with request-scoped values.

# Benchmarks

```
goos: darwin
goarch: amd64
pkg: github.com/ahmedalhulaibi/loggy
cpu: Intel(R) Core(TM) i5-1038NG7 CPU @ 2.00GHz
BenchmarkLoggy-8                        60992144               394.0 ns/op           280 B/op          4 allocs/op
BenchmarkZap-8                          61309858               390.8 ns/op           280 B/op          4 allocs/op
BenchmarkLoggy_NoLoggingContext-8       313296274              73.27 ns/op             0 B/op          0 allocs/op
BenchmarkZap_NoLoggingContext-8         20103192                1208 ns/op          1200 B/op         30 allocs/op
PASS
ok      github.com/ahmedalhulaibi/loggy 105.226s
```

Some details on the benchmarks:
- The tests all use a `Nop` logger and do not write any log messages since the purpose is to benchmark the overhead required to create/access the logging context.
- `BenchmarkLoggy` and `BenchmarkZap` both assume logging context already exists.
- `BenchmarkLoggy_NoLoggingContext` and `BenchmarkZap_NoLoggingContext` both assume that a logging context does not exist.

I plan on following up with a benchmark use-case an HTTP API with middleware, but I expect similar results.

Check it out and let me know if my methods were flawed or if you have any thoughts on how to improve the tests or library! [https://github.com/ahmedalhulaibi/loggy](https://github.com/ahmedalhulaibi/loggy)