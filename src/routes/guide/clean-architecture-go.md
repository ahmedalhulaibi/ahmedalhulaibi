---
title: 'Clean (maybe?) Architecture in Go'
excerpt: "How I prefer to structure my web services"
date: '2021-08-24T21:35:07.322Z'
author: Ahmed Al-Hulaibi
status: draft
---

1. API Specification using Protobuf
2. Generate Stub
3. Core Domain Services
4. Transport Layer
5. Repository Layer
7. Event Layer
8. Testing
9. Configuration


# API Specification using Protobuf
- Keep specification in `proto` directory
- Define services
  - Define request and response schema
- Define event streams
  - Define event schema
- Use buf.build
  - Add buf.build linting and compatibility checks

```

```

# Generate Stub
- Separate generated code in `gen` directory

# Core Domain Services (Business Logic)

- Invoked by transport layer

### Functional core imperative shell
- Predictable and fully unit testable functional core
- Imperative shell is in-process orchestration between functional core, repository, events
  - Read from Repository
  - Do things with Functional Core
  - Write to Repository
  - Emit events via Event Layer Publishers
  - Return to Transport Layer

### Transport Agnostic
- Should not be aware of how or from where it was triggered. In other words HTTP, gRPC, events, and other transport specific data should not affect business logic
- Request-scoped data can be passed in via `context.Context` - should not affect how business logic is processed

### Repository Agnostic
- repository interface defined locally, using package scoped exported types for inputs and outputs, modeled based on business logic and atomic units of work

### Logging
- Log only in the imperative shell layer, not the functional core
- Consider a separate logging layer as an entry point to the imperative shell. Implement as a decorator. Keep all logging in this layer
### Tracing
- Trace only in the imperative shell layer, not the functional core
- Consider a separate tracing layer as an entry point to the imperative shell. Implement as a decorator. Keep all tracing in this layer

# Transport Layer

- Transport layer implements gRPC server
- Inject service into transport layer

### Request-Scoped Metadata
- Unravel and inject in `context.Context`

### Logging
- Use middleware to log
- Extract request-scoped metadata from `context.Context`

### Tracing
- Use middleware to capture and extend spans
- Extract request-scoped metadata from `context.Context`

# Repository Layer

- Don't try to force the repository layer to be implemented directly based the repository interface defined at the service layer. The repository adapter will adapt the repository implementation to fit the service requirements
- sqlc to generate repository primitives
- Write repository adapter 
## Repository Adapters

Repository Adapter implements service defined repository interface

# Event Layer

- Emit facts from the application layer
- Avoid hooking into database (Change Data Capture) as the Repository data model may not match the event data model 

## Event Publisher Adapters

Event Publisher Adapters implements service defined event publisher interface

> # Consider persisting events
> Persist events through an event log or a time series database (with ACID guarantees)
> 

## Workers (Subscribers) treated like a Transport Layer

# Testing

## Unit tests
- Focus on testing Functional Core and Imperative Shell
- Use mocks for repository and events
- Helpers as libraries
- Avoid package scoped data

## Integration tests
- Use dockertest
- Helpers as libraries
- Avoid package scoped data

> ### Tip: Test log message output with Golden files

___
## Further Reading