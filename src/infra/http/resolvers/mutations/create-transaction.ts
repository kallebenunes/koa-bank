import { SendTransactionUseCase } from "@/domain/bank/application/use-cases/send-transaction";
import { PrismaTransactionsRepository } from "../../database/repositories/prisma-transactions-repository";
import { PrismaAccountsRepository } from "../../database/repositories/prisma-accounts-repository";

type sendTransactionArgs = {
  originAccountId: string;
  destinationAccountId: string;
  amount: number;
}

type SendTransactionInput = {
  input: sendTransactionArgs
}
export const sendTransaction = async ({input}: SendTransactionInput) => {
  const { originAccountId, destinationAccountId, amount } = input;
  
  const transactionsRepository = new PrismaTransactionsRepository();
  const accountsRepository = new PrismaAccountsRepository(transactionsRepository);
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