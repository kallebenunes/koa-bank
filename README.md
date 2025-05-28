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
- Domain-Driven Design
  - Clean architecture principles
  - Rich domain model
  - Use case driven development
  - Event-driven architecture

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

## Available Endpoints

The GraphQL API is accessible at the following URLs:
- GraphQL Endpoint: `/graphql` - Use this endpoint for your API requests
- GraphQL Playground: `/playground` - Interactive API documentation and testing interface

## Architecture

The project follows a Domain-Driven Design approach with these key concepts:

- **Entities**: Core domain objects (Account, Transaction)
- **Use Cases**: Application business rules
- **Repositories**: Data access abstractions
- **Events**: Domain events for key business operations
- **Either Pattern**: Functional error handling

## Testing

The project includes configuration for both unit and E2E tests, but unitl now only unit tests were written.

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e
```

## License

MIT
