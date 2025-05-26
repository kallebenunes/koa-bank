import { UseCaseError } from '@/core/errors/use-case-error'

export class LockedError extends Error implements UseCaseError {
  constructor() {
    super('Resource is locked')
  }
}
