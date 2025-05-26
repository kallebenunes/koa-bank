import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Transaction } from "./Transaction";

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