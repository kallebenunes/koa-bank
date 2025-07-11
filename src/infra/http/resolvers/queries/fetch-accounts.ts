import { FetchAccountsUseCase } from "@/domain/bank/application/use-cases/fetch-accounts";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";
import { RedisCacheRepository } from "../../cache/redis/redis-cache-repository";
import { redis_connection } from "../../cache/redis/redis.service";
import z from "zod";
import { InvalidArgumentsError } from "../errors/invalid-arguments-error";

const fetchAccountsArgsSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive().optional(),
})  

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
  const parsedArgs = fetchAccountsArgsSchema.safeParse(args);

  if (!parsedArgs.success) {
    throw new InvalidArgumentsError('Invalid arguments provided', parsedArgs.error);
  }


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
    customerId: account.customerId.toString(),
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt ? account.updatedAt.toISOString() : null,
  })) || [];

  
} 