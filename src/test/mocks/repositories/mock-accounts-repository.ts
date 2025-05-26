import { AccountsRepository } from "@/domain/bank/application/repositories/accounts-repository";


export function makeMockAccountsRepository(): jest.Mocked<AccountsRepository> {
  return {
    findById: jest.fn(),
    findByCustomerId: jest.fn(),
    save: jest.fn(),
  };
}