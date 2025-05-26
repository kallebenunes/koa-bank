import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { TransactionsRepository } from "../repositories/transactions-repository";
import { Transaction } from "../../enterprise/entities/Transaction";
import { AccountsRepository } from "../repositories/accounts-repository";
import { DomainEvents } from "@/core/events/domain-events";

export interface SendTransactionDTO {
  amount: number;
  destinationAccountId: string;
  originAccountId: string; // Optional, can be used to specify the origin account
}

export interface SendTransactionResponse {
  transaction: Transaction;
}

export class SendTransactionUseCase {
  constructor(private transactionRepository: TransactionsRepository, private accountsRepository: AccountsRepository) {}

  async execute(transactionData: SendTransactionDTO): Promise<SendTransactionResponse> {
    
    const destinationAccount = await this.accountsRepository.findById(transactionData.destinationAccountId);

    if (!destinationAccount) {
      throw new Error("Destination account not found");
    }

    const originAccount = await this.accountsRepository.findById(transactionData.originAccountId);

    if(!originAccount) {
      throw new Error("Origin account not found");
    }

    if(originAccount.balance < transactionData.amount) {
      throw new Error("Insufficient funds in origin account");
    }
    
    if(DomainEvents.findMarkedAggregateByID(originAccount.id) ) {
      throw new Error("Origin account is already marked for an event");
    }

    if(DomainEvents.findMarkedAggregateByID(destinationAccount.id) ) {
      throw new Error("Destination account can't proccess a transaction");
    }

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