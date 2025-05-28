import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Transaction } from "./Transaction";
import { TransactionSentEvent } from "../events/transaction-sent-event";
import { TransactionReceivedEvent } from "../events/transaction-received-event";
import { Optional } from "@/core/types/optional";


export interface AccountProps {
  balance: number 
  customerId: UniqueEntityID
  transactions: Transaction[]
  createdAt: Date,
  updatedAt?: Date | null
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
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt || null;
  }

  updateBalance(amount: number){
    this.props.balance = amount;
    this.touch();
  }

  touch(){
    this.props.updatedAt = new Date();
  }

  addTransaction(transaction: Transaction) {
    if(transaction.originAccount.equals(this.id)) {
      this.addDomainEvent(new TransactionSentEvent(transaction));

      const updatedBalance = this.props.balance - transaction.amount;

      this.updateBalance(updatedBalance);
    }
    if(transaction.destinationAccount.equals(this.id)) {
      this.addDomainEvent(new TransactionReceivedEvent(transaction));

      const updatedBalance = this.props.balance + transaction.amount;

      this.updateBalance(updatedBalance);
    }
  }

  static create(props: Optional<AccountProps, 'createdAt'>, id?: UniqueEntityID) {
    const account =  new Account(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        transactions: props.transactions || [],
      },
      id
    );

    return account;
  }
}