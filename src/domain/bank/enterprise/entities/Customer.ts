import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface CustomerProps  {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Customer extends Entity<CustomerProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: CustomerProps, id?: string): Customer {
    const customer = new Customer({
      ...props,
      createdAt: props.createdAt || new Date(),
    }, new UniqueEntityID(id));
    return customer;
  }
}