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
    type: String!
    createdAt: String!
    originAccountId: String!
    destinationAccountId: String!
  }

  type Account {
    id: ID!
    userId: ID!
    balance: Float!
    createdAt: String!
    updatedAt: String!
    user: User!
    transactions: [Transaction!]!
    sentTransactions: [Transaction!]!
    receivedTransactions: [Transaction!]!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    accounts: [Account!]!
    transactions: [Transaction!]!
  }

  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(id: ID!, email: String, name: String): User
    deleteUser(id: ID!): User
  }
`