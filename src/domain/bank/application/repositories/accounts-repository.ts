import { Account } from '../../enterprise/entities/Account';

export interface AccountsRepository {
  save(account: Account): Promise<void>;
  findById(id: string): Promise<Account | null>;
  findByCustomerId(customerId: string): Promise<Account | null>;
}