import { Account } from './../../enterprise/Account';

export interface AccountsRepository {
  save(account: Account): Promise<void>;
  findById(id: string): Promise<Account | null>;
  findByCustomerId(customerId: string): Promise<Account | null>;
}