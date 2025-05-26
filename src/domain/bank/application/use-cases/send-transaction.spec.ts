
import { makeMockAccountsRepository } from "@/test/mocks/repositories/mock-accounts-repository";
import { SendTransactionUseCase } from "./send-transaction";
import { makeAccount } from "@/test/factories/make-account";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

describe("Send Transaction Use Case", () => {
  
  const mockAccountsRepository = makeMockAccountsRepository();

  const sut = new SendTransactionUseCase(mockAccountsRepository);
  it("should be able to send a transaction", async () => {
    

    const originAccount = makeAccount({
      balance: 1000,
      customerId: new UniqueEntityID("customer-id-origin"),
      transactions: [],
    }, new UniqueEntityID("origin-account-id"));
    
    const destinationAccount = makeAccount({
      balance: 500,
      customerId: new UniqueEntityID("customer-id-destination"),
      transactions: [],
    }, new UniqueEntityID("destination-account-id"));

    mockAccountsRepository.findById.mockResolvedValueOnce(destinationAccount);
    mockAccountsRepository.findById.mockResolvedValueOnce(originAccount);
    
  
    const transactionData = {
      amount: 100,
      destinationAccountId: "destination-account-id",
      originAccountId: "origin-account-id",
    };

    
    const result = await sut.execute(transactionData);
    
    expect(mockAccountsRepository.findById).toHaveBeenCalledWith("destination-account-id");
    expect(mockAccountsRepository.findById).toHaveBeenCalledWith("origin-account-id");
    expect(mockAccountsRepository.processTransaction).toHaveBeenCalled()
    expect(result.isRight()).toBe(true);
    
  } )
} )