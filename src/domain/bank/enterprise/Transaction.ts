import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface TransactionProps {
  originAccout: UniqueEntityID;
  destinationAccount: UniqueEntityID;
  amount: number;
  createdAt: Date;
}

export class Transaction extends Entity<TransactionProps> {

  get originAccount(): UniqueEntityID {
    return this.props.originAccout;
  }

  get destinationAccount(): UniqueEntityID {
    return this.props.destinationAccount;
  }

  get amount(): number {
    return this.props.amount;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: TransactionProps, id?: UniqueEntityID) {
    return new Transaction(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
      },
      id
    );

  }
}