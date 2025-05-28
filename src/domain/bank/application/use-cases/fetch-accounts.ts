import { AccountsRepository } from "../repositories/accounts-repository";
import { Either, right } from "@/core/either";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { Account } from "../../enterprise/entities/Account";

export interface FetchAccountsUseCaseResponse {
  accounts: Account[]
}

export class FetchAccountsUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(paginationParams: PaginationParams): Promise<Either<null, FetchAccountsUseCaseResponse>> {
    const accounts = await this.accountsRepository.findMany(paginationParams);
    
    return right({
      accounts,
    })
  }
}