import { GetAccountBalanceUseCase } from "@/domain/bank/application/use-cases/get-account-balance";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";
import { RedisCacheRepository } from '../../cache/redis/redis-cache-repository';
import { redis_connection } from "../../cache/redis/redis.service";

interface GetAccountBalanceArgs {
  accountId: string;
}

/**
 * Retrieves the balance for a specific account.
 *
 * @param accountId - The ID of the account to retrieve the balance for.
 * @returns {{ balance: number }} An object with the account balance.
 */
export const getAccountBalance = async (args: GetAccountBalanceArgs) => {

  const redisCacheRepository = new RedisCacheRepository(redis_connection);

  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository(transactionsRepository, redisCacheRepository);
  const getAccountBalaceUseCase = new GetAccountBalanceUseCase(accountsRepository);
  
  const result = await getAccountBalaceUseCase.execute(args.accountId)

  if (result.isLeft()) {
    throw new Error(result.value.message);
  }

  return {
    balance: result.value.balance,
  }
  
} 