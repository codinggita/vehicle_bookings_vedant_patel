# System Architecture & API Catalog Design Notes

This directory houses system design layouts, Postman API collections, and architectural reference diagrams for the Vehicle Booking Backend.

## API Endpoint Blueprint Mappings

All request parameters, headers, and responses are formatted as JSON payloads.

```
                  ┌────────────────────────┐
                  │   HTTP Client Request  │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │    Express Router      │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  Middlewares Guard     │ (Auth, RBAC, Rate Limits)
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  Request Validator     │ (Input sanitizations)
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │    MVC Controller      │ (Req parsing, calling Service)
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │    Services Layer      │ (Business logic, DB queries)
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │    Mongoose Schema     │ (Model validations)
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │    MongoDB Cluster     │ (Document store)
                  └────────────────────────┘
```

## Folder Responsibilities

1. **`config/`**: Third-party integrations (MongoDB connections, OAuth/JWT configurations).
2. **`controllers/`**: Extracts parameters from request payloads, triggers corresponding services, and handles HTTP responses.
3. **`services/`**: Holds absolute business rules, Mongoose queries, data manipulations, and computations.
4. **`routes/`**: Handles endpoint path definitions and maps controllers to endpoints with specific middlewares.
5. **`middlewares/`**: Performs request pre-processing (authentication verification, authorization guards, request body sanitization, and global error handling).
6. **`models/`**: Manages entity modeling and database schemas with type validations.
7. **`validators/`**: Executes rigorous schema validation before controllers handle payloads.
8. **`utils/`**: Reusable generic utilities (pagination math, sorting parser, formatting utilities).
9. **`constants/`**: Prevents system-wide string duplication (user roles, booking states, payment formats).
