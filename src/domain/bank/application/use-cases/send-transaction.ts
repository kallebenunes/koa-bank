import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { TransactionsRepository } from "../repositories/transactions-repository";
import { Transaction } from "../../enterprise/entities/Transaction";

export interface SendTransactionDTO {
  amount: number;
  destinationAccountId: string;
  originAccountId?: string; // Optional, can be used to specify the origin account
}

export interface SendTransactionResponse {
  transaction: Transaction;
}

export class SendTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionsRepository) {}

  async execute(transactionData: SendTransactionDTO): Promise<SendTransactionResponse> {
        
    const transaction = Transaction.create({
      amount: transactionData.amount,
      destinationAccount: new UniqueEntityID(transactionData.destinationAccountId),
      originAccout: new UniqueEntityID(transactionData.originAccountId),
    })
  
    await this.transactionRepository.save(transaction);

    return {
      transaction
    }
    
  }

  
}