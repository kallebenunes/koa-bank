import { PrismaTransactionsRepository } from './../../database/repositories/prisma-transactions-repository';
import { PrismaAccountsRepository } from './../../database/repositories/prisma-accounts-repository';
import { GetAccountBalanceUseCase } from '@/domain/bank/application/use-cases/get-account-balance';

export const QUERIES = {
  getAccountBalance: async (args) => {
    const transactionsRepository = new PrismaTransactionsRepository();
    const accountsRepository = new PrismaAccountsRepository(transactionsRepository);
    const getAccountBalaceUseCase = new GetAccountBalanceUseCase(accountsRepository);
    
    const result = await getAccountBalaceUseCase.execute(args.accountId);

    return {
      balance: parseInt(result.value.balance),
    };

  } 
}