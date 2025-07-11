import { SendTransactionUseCase } from "@/domain/bank/application/use-cases/send-transaction";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";
import { redis_connection } from "../../cache/redis/redis.service";
import { RedisCacheRepository } from "../../cache/redis/redis-cache-repository";
import z from "zod";
import { GraphQLError } from "graphql";
import { InvalidArgumentsError } from "../errors/invalid-arguments-error";

const sendTransactionArgsSchema = z.object({
  input: z.object({
    originAccountId: z.string().uuid(),
    destinationAccountId: z.string().uuid(),
    amount: z.number().int().positive(),
  }),
});
export type SendTransactionArgs = z.infer<typeof sendTransactionArgsSchema>;

/**
 * Sends a transaction from one account to another.
 *
 * @param originAccountId  - The ID of the account from which the transaction is sent.
 * @param destinationAccountId - The ID of the account to which the transaction is sent.
 * @param amount - The amount to be transferred.
 * @returns {{ success: boolean }} - The result of the transaction, indicating success or failure.
 */

export const sendTransaction = async (args: SendTransactionArgs) => {
  
  const parsedArgs = sendTransactionArgsSchema.safeParse(args);
  if (!parsedArgs.success) {
    throw new InvalidArgumentsError(`Invalid arguments provided`, parsedArgs.error);
  }
  const input = parsedArgs.data.input;
  
  const { originAccountId, destinationAccountId, amount } = input;
  
  const redisCacheRepository = new RedisCacheRepository(redis_connection);

  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository(transactionsRepository, redisCacheRepository);
  const sendTransactionUseCase = new SendTransactionUseCase(accountsRepository)// Validate that the origin and destination accounts are differenc

  const transaction = await sendTransactionUseCase.execute({
    amount,
    originAccountId,
    destinationAccountId,
  })
  
  if (transaction.isLeft()) {
    throw new GraphQLError(transaction.value.message)
  }

  return {
    success: true,
  }
}