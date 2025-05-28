import { makeMockAccountsRepository } from "@/test/mocks/repositories/mock-accounts-repository";
import { FetchAccountsUseCase } from "./fetch-accounts";
import { makeAccountsList } from "@/test/factories/make-account";

describe("FetchAccountsUseCase", () => {
  const accountsRepository = makeMockAccountsRepository()
  const sut = new FetchAccountsUseCase(accountsRepository); // Replace with actual instance of FetchAccountsUseCase
  
 it.only("should be able to fetch accounts", async () => {
    

    const accountsList = makeAccountsList()

    accountsRepository.findMany.mockResolvedValue(accountsList);

    const result = await sut.execute({
      page: 1,
      limit: 10,
    });

    expect(result.isRight()).toBeTruthy();

    if(result.isRight()){
      expect(result.value.accounts).toHaveLength(10);
      expect(accountsRepository.findMany).toHaveBeenCalledWith({page: 1, limit: 10});
    }
 }); 
})