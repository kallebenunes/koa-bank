import { PaginationParams } from '@/core/repositories/pagination-params';
import { Account } from '../../enterprise/entities/Account';
import { Transaction } from '../../enterprise/entities/Transaction';
export interface AccountsRepository {
  create(account: Account): Promise<Account>;
  save(account: Account): Promise<void>;
  findMany(paginationParams: PaginationParams): Promise<Account[]>;
  findById(id: string): Promise<Account | null>;
  findByCustomerId(customerId: string): Promise<Account | null>;
  settleTransaction(transaction: Transaction, originAccount: Account, destinationAccount: Account): Promise<void>;
}