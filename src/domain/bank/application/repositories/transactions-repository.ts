import { PaginationParams } from "@/core/repositories/pagination-params";
import { Transaction } from "../../enterprise/entities/Transaction";

export interface TransactionsRepository {
  findById(id: string): Promise<Transaction | null>;
  findAll(paginationParams?: PaginationParams): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}