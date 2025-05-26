import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Transaction } from "./Transaction";
import { TransactionSentEvent } from "../events/transaction-sent-event";
import { TransactionReceivedEvent } from "../events/transaction-received-event";


export interface AccountProps {
  balance: number 
  customerId: UniqueEntityID
  transactions: Transaction[]
}

export class Account extends AggregateRoot<AccountProps> {
  get balance(): number {
    return this.props.balance;
  }

  get customerId(): UniqueEntityID {
    return this.props.customerId;
  }

  get transactions(): Transaction[] {
    return this.props.transactions;
  }

  addTransaction(transaction: Transaction) {
    if(transaction.originAccount.equals(this.id)) {
      this.addDomainEvent(new TransactionSentEvent(transaction));
    }
    if(transaction.destinationAccount.equals(this.id)) {
      this.addDomainEvent(new TransactionReceivedEvent(transaction));
    }
  }

  static create(props: AccountProps, id?: UniqueEntityID) {
    return new Account(
      {
        ...props,
        transactions: props.transactions || [],
      },
      id
    );
  }
}