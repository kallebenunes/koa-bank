import { FetchAccountsUseCase } from "@/domain/bank/application/use-cases/fetch-accounts";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";
import { RedisCacheRepository } from "../../cache/redis/redis-cache-repository";
import { redis_connection } from "../../cache/redis/redis.service";

interface FetchAccountsArgs {
  page: number;
  limit?: number;
}
 /**
   * Returns a list of accounts.
   *
   * @param page - Specifies the page number for pagination
   * @param limit - Specifies the number of accounts to return per page (default is 10)
   * @returns accounts list
   *
   */
export const fetchAccounts = async (args: FetchAccountsArgs) => {
  const redisCacheRepository = new RedisCacheRepository(redis_connection);

  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository(transactionsRepository, redisCacheRepository);
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
    updatedAt: account.updatedAt ? account.updatedAt.toISOString() : null,
  })) || [];

  
} 