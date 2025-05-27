import { GetAccountBalanceUseCase } from "@/domain/bank/application/use-cases/get-account-balance";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";

interface GetAccountBalanceArgs {
  accountId: string;
}

export const getAccountBalance = async (args: GetAccountBalanceArgs) => {
  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository(transactionsRepository);
  const getAccountBalaceUseCase = new GetAccountBalanceUseCase(accountsRepository);
  
  const result = await getAccountBalaceUseCase.execute(args.accountId)

  if (result.isLeft()) {
    throw new Error(result.value.message);
  }

  return {
    balance: result.value.balance,
  }
  
} 