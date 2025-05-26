import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { AccountsRepository } from "../repositories/accounts-repository";
import { Either, left, right } from "@/core/either";

export interface GetAccountBalanceResponse {
  balance: number;
}

export type GetAccountBalanceUseCaseResponse = Either<
  ResourceNotFoundError,
  GetAccountBalanceResponse
>;

export class GetAccountBalanceUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(accountId: string): Promise<GetAccountBalanceUseCaseResponse> {
    const account = await this.accountsRepository.findById(accountId);

    if (!account) {
      return left(new ResourceNotFoundError())
    }

    return right({
      balance: account.balance,
    })
  }
}