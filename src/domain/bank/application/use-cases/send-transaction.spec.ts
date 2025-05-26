import { makeMockTransactionsRepository } from "@/test/mocks/repositories/mock-transactions-repository";
import { SendTransactionUseCase } from "./send-transaction";


describe("Send Transaction Use Case", () => {
  const mockTransactionsRepository = makeMockTransactionsRepository();

  const sut = new SendTransactionUseCase(mockTransactionsRepository);
  it("should be able to send a transaction", async () => {
    

    const transactionData = {
      amount: 100,
      destinationAccountId: "destination-account-id",
      originAccountId: "origin-account-id",
    };

    const transaction = await sut.execute(transactionData);

    expect(mockTransactionsRepository.save).toHaveBeenCalledWith(transaction.transaction);
    
  } )
} )