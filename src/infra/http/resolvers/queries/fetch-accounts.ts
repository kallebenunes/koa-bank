import { FetchAccountsUseCase } from "@/domain/bank/application/use-cases/fetch-accounts";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";

interface FetchAccountsArgs {
  page: number;
  limit?: number;
}

export const fetchAccounts = async (args: FetchAccountsArgs) => {
  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository(transactionsRepository);
  const getAccountBalaceUseCase = new FetchAccountsUseCase(accountsRepository);
  
  const result = await getAccountBalaceUseCase.execute({
    page: args.page,
    limit: args.limit || 10,
  });
  
  return result.value?.accounts.map(account => ({
    id: account.id.toString(),
    balance: account.balance,
    customerId: account.customerId.toString(),
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt?.toISOString(),
  })) || [];

  
} 