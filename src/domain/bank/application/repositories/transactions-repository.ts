import { Transaction } from "../../enterprise/entities/Transaction";

export interface TransactionsRepository {
  findById(id: string): Promise<Transaction | null>;
  findAll(accountId: string): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}