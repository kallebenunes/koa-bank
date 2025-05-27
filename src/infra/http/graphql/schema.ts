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
    userId: ID!
    balance: Float!
    createdAt: String!
    updatedAt: String!
    user: User!
    transactions: [Transaction!]!
    sentTransactions: [Transaction!]!
    receivedTransactions: [Transaction!]!
  }

  type AccountBalance {
  balance: Int!
}


  type Query {
    getAccountBalance(accountId: ID!): AccountBalance!
  }

  type Mutation {
    createTransaction(id: ID!): Transaction!
  }
`