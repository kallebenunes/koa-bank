import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Transaction } from "../../enterprise/entities/Transaction";
import { AccountsRepository } from "../repositories/accounts-repository";
import { DomainEvents } from "@/core/events/domain-events";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { LockedError } from "./errors/ConflictError";

export interface SendTransactionDTO {
  amount: number;
  destinationAccountId: string;
  originAccountId: string; // Optional, can be used to specify the origin account
}

export type SendTransactionResponse = Either<Error, null>;

export class SendTransactionUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(transactionData: SendTransactionDTO): Promise<SendTransactionResponse> {
    
    const destinationAccount = await this.accountsRepository.findById(transactionData.destinationAccountId);

    if (!destinationAccount) {
      return left(new ResourceNotFoundError())
    }

    const originAccount = await this.accountsRepository.findById(transactionData.originAccountId);

    if(!originAccount) {
      return left(new ResourceNotFoundError())
    }

    if(originAccount.balance < transactionData.amount) {
      return left(new Error('Insufficient funds'))
    }
    
    if(DomainEvents.findMarkedAggregateByID(originAccount.id) || DomainEvents.findMarkedAggregateByID(destinationAccount.id)) {
      return left(new LockedError())
    }


    const transaction = Transaction.create({
      amount: transactionData.amount,
      destinationAccount: new UniqueEntityID(transactionData.destinationAccountId),
      originAccout: new UniqueEntityID(transactionData.originAccountId),
    })
    
    originAccount.addTransaction(transaction);
    destinationAccount.addTransaction(transaction);

    await this.accountsRepository.processTransaction(transaction, originAccount, destinationAccount);

    return right(null)
    
  }

  
}