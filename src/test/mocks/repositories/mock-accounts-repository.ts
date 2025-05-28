import { AccountsRepository } from "@/domain/bank/application/repositories/accounts-repository";


export function makeMockAccountsRepository(): jest.Mocked<AccountsRepository> {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findByCustomerId: jest.fn(),
    save: jest.fn(),
    settleTransaction: jest.fn(),
    findMany: jest.fn(), // Default to returning an empty array
  };
}