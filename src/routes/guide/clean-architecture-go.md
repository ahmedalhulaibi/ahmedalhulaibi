---
title: 'Clean (maybe?) Architecture in Go'
excerpt: "How I prefer to structure my web services"
date: '2021-08-24T21:35:07.322Z'
author: Ahmed Al-Hulaibi
---

1. API Specification using Protobuf
2. Generate Stub
3. Core Domain Services
4. Transport Layer
5. Repository Layer
6. Repository Adapter Layer


# API Specification using Protobuf

```

```

# Generate Stub


# Core Domain Services

### Functional core imperative shell
- Predictable and fully unit testable

### Transport Agnostic
- Should not be aware of how or from where it was triggered. In other words HTTP, gRPC, and other transport specific data should not affect business logic

### Repository Agnostic
- repository interface defined locally, using package scoped exported types, modeled based on business logic and atomic units of work

### Logging as a decorator

### Traces as a decorator

# Transport Layer

- Transport layer implements gRPC service implementation
- Inject service into transport layer

# Repository Layer

Don't try to force the repository layer to be implemented directly based the repository interface defined at the service layer. The repository adapter will adapt the repository implementation to fit the service requirements

# Repository Adapter Layer

Repository Adapter Layer implements service defined repository interface

___
## Further Reading