import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Transaction } from '../entities/Transaction'

export class TransactionReceivedEvent implements DomainEvent {
  public ocurredAt: Date
  public transaction: Transaction

  constructor(Transaction: Transaction) {
    this.transaction = Transaction
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.transaction.id
  }
}
