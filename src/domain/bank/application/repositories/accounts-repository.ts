import { Account } from '../../enterprise/entities/Account';
import { Transaction } from '../../enterprise/entities/Transaction';

export interface AccountsRepository {
  save(account: Account): Promise<void>;
  findById(id: string): Promise<Account | null>;
  findByCustomerId(customerId: string): Promise<Account | null>;
  processTransaction(transaction: Transaction, originAccount: Account, destinationAccount: Account): Promise<void>;
}