# Koa Bank Backend

A modern banking system backend built with Koa.js, GraphQL, and MongoDB, following Domain-Driven Design (DDD) principles.

## Features

- Account Management
  - Check account balances
  - Settle transactions between accounts
- Transaction System
  - Send money between accounts, if someone is sending someone is receiving
  - Real-time transaction events
- GraphQL API
  - Modern API design with GraphQL

## Tech Stack

- **Framework**: Koa.js
- **API**: GraphQL
- **Database**: MongoDB with Prisma ORM
- **Language**: TypeScript
- **Testing**: Jest
- **Architecture**: Domain-Driven Design (DDD)

## Project Structure

```
src/
├── core/              # Core DDD building blocks
├── domain/           # Domain layer (entities, use cases)
│   └── bank/
│       ├── application/  # Use cases, repositories interfaces
│       └── enterprise/   # Domain entities, events
└── infra/            # Infrastructure layer
    └── http/         # HTTP server, GraphQL resolvers
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   
3. Set up your environment variables:
   ```
   DATABASE_URL=mongodb://mongo1:27017,mongo2:27017,mongo3:27017/koabank?replicaSet=rs0
   REDIS_HOST=0.0.0.0
   REDIS_PORT=6379
   PORT=4000
   ```
4. Create docker-compose.override.yml:
   There is a docker-compose.override-example on the project root. 
   It is needed to run the project on development mode with databases exposed ports.

5. Set up docker compose:
   ```bash
   docker-compose up -d
   ```
5. Run database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run all tests

## API Examples

### Check Account Balance

```graphql
query {
  getAccountBalance(accountId: "account-id") {
    balance
  }
}
```

### Send Transaction

```graphql
mutation {
  sendTransaction(input: {
    originAccountId: "account-1"
    destinationAccountId: "account-2"
    amount: 100
  })
}
```
There is a insomnia-collection at the root of the project that can be used with postman

## Available Endpoints

The GraphQL API is accessible at the following URLs:
- GraphQL Endpoint: `/graphql` [https://koabank.kallebedev.com/graphql] - Use this endpoint for your API requests
- GraphQL Playground: `/playground` [https://koabank.kallebedev.com/playground] - Interactive API documentation and testing interface

## Architecture

The project follows  Domain-Driven Design, Clean and Hexagonal Architecture approaches.
![Untitled-2025-05-11-2002](https://github.com/user-attachments/assets/6b8d2e2e-c3a6-45de-849f-5f2360998c2c)

- **Entities**: Core domain objects (Account, Transaction)
- **Use Cases**: Application business rules
- **Repositories**: Data access abstractions
- **Events**: Domain events for handling state management
- **Either Pattern**: Functional error handling

## Testing

The project includes configuration for both unit and E2E tests, but unitl now only unit tests were written.

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e
```
