import { UseCaseError } from '@/core/errors/use-case-error'

export class InsufficientFunds extends Error implements UseCaseError {
  constructor() {
    super('Insufficient funds.')
  }
}
