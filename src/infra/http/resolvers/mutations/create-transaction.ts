import { SendTransactionUseCase } from "@/domain/bank/application/use-cases/send-transaction";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";
import { redis_connection } from "../../cache/redis/redis.service";
import { RedisCacheRepository } from "../../cache/redis/redis-cache-repository";

type sendTransactionArgs = {
  originAccountId: string;
  destinationAccountId: string;
  amount: number;
}

type SendTransactionInput = {
  input: sendTransactionArgs
}

/**
 * Sends a transaction from one account to another.
 *
 * @param originAccountId  - The ID of the account from which the transaction is sent.
 * @param destinationAccountId - The ID of the account to which the transaction is sent.
 * @param amount - The amount to be transferred.
 * @returns {{ success: boolean }} - The result of the transaction, indicating success or failure.
 */

export const sendTransaction = async ({input}: SendTransactionInput) => {
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
    throw new Error(transaction.value.message);
  }

  return {
    success: true,
  }
}