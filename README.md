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
3. Set up MongoDB:
   ```bash
   docker-compose up -d
   ```
4. Set up your environment variables:
   ```
   DATABASE_URL=mongodb://localhost:27017/koa-bank?replicaSet=rs0&directConnection=true
   PORT=4000
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
![image](https://github.com/user-attachments/assets/e46e35d1-c387-475e-a9a0-7f6bd1244aa6)

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
