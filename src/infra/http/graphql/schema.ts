export const SCHEMA = `
  type User {
    id: ID!
    email: String!
    name: String
    createdAt: String!
    updatedAt: String!
    }

  type Transaction {
    id: ID!
    amount: Float!
    createdAt: String!
    originAccountId: String!
    destinationAccountId: String!
  }

  type Account {
    id: ID!
    customerId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type AccountBalance {
    balance: Int!
  }

  type Query {
    getAccountBalance(accountId: ID!): AccountBalance!
    fetchAccounts(page: Int, limit: Int): [Account]!
  }

  type TransactionResponse {
    success: Boolean!
  }

  input SendTransactionInput {
    originAccountId: ID!
    destinationAccountId: ID!
    amount: Int!
  }

  type Mutation {
    sendTransaction(input: SendTransactionInput!): TransactionResponse!
  }

`