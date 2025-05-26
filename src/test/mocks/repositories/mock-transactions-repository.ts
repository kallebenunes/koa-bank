import { TransactionsRepository } from '@/domain/bank/application/repositories/transactions-repository';

export function makeMockTransactionsRepository(): jest.Mocked<TransactionsRepository> {
  return {
    findAll:  jest.fn(),
    findById: jest.fn(),
    save: jest.fn()
  };
}