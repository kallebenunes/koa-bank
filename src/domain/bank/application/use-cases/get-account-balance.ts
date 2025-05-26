import { AccountsRepository } from "../repositories/accounts-repository";

export interface GetAccountBalanceResponse {
  balance: number;
}

export class GetAccountBalanceUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(accountId: string): Promise<GetAccountBalanceResponse> {
    const account = await this.accountsRepository.findById(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    return {
      balance: account.balance,
    }
  }
}