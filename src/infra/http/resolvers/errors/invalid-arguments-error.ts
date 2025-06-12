import { GraphQLError } from 'graphql';
import { ZodError } from 'zod';

export class InvalidArgumentsError extends GraphQLError {
  constructor(message = 'Invalid arguments provided', zodError?: ZodError) {
    super(message, undefined, undefined, undefined, undefined, undefined, {
      code: 'BAD_USER_INPUT',
      validationErrors: zodError?.issues,
    });
    this.name = 'InvalidArgumentsError';
  }
}

