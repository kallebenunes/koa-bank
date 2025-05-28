import { UseCaseError } from '@/core/errors/use-case-error'

export class SameAccountError extends Error implements UseCaseError {
  constructor() {
    super('Transaction between same account is not allowed')
  }
}
