
import { makeMockAccountsRepository } from "@/test/mocks/repositories/mock-accounts-repository";
import { SendTransactionUseCase } from "./send-transaction";
import { makeAccount } from "@/test/factories/make-account";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { LockedError } from "./errors/ConflictError";
import { DomainEvents } from "@/core/events/domain-events";

describe("Send Transaction Use Case", () => {
  
  const mockAccountsRepository = makeMockAccountsRepository();

  const sut = new SendTransactionUseCase(mockAccountsRepository);

  beforeEach(() => {
    jest.clearAllMocks();
    DomainEvents.clearMarkedAggregates()
  });

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

  it("should not be able to send a transaction if the destination account does not exist", async () => {
    const originAccount = makeAccount({
      balance: 1000,
      customerId: new UniqueEntityID("customer-id-origin"),
      transactions: [],
    }, new UniqueEntityID("origin-account-id"));

    mockAccountsRepository.findById.mockResolvedValueOnce(originAccount);
    mockAccountsRepository.findById.mockResolvedValueOnce(null);

    const transactionData = {
      amount: 100,
      destinationAccountId: "non-existent-account-id",
      originAccountId: "origin-account-id",
    };

    const result = await sut.execute(transactionData);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    expect(mockAccountsRepository.findById).toHaveBeenCalledWith("non-existent-account-id");
  })
  it("should not be able to send a transaction if the origin account does not exist", async () => {
    const destinationAccount = makeAccount({
      balance: 500,
      customerId: new UniqueEntityID("customer-id-destination"),
      transactions: [],
    }, new UniqueEntityID("destination-account-id"));

    mockAccountsRepository.findById.mockResolvedValueOnce(destinationAccount);
    mockAccountsRepository.findById.mockResolvedValueOnce(null);

    const transactionData = {
      amount: 100,
      destinationAccountId: "destination-account-id",
      originAccountId: "non-existent-account-id",
    };

    const result = await sut.execute(transactionData);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
    expect(mockAccountsRepository.findById).toHaveBeenCalledWith("non-existent-account-id");
  })
  it("should not be able to send a transaction if the origin account has insufficient funds", async () => {
    const originAccount = makeAccount({
      balance: 50,
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

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(Error);
    expect(mockAccountsRepository.processTransaction).not.toHaveBeenCalled();
  })
  it("should not be able to send a transaction if the accounts are locked", async () => {
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
    mockAccountsRepository.findById.mockResolvedValueOnce(destinationAccount);
    mockAccountsRepository.findById.mockResolvedValueOnce(originAccount);

    
    const transactionData = {
      amount: 100,
      destinationAccountId: "destination-account-id",
      originAccountId: "origin-account-id",
    };

    await sut.execute(transactionData);
    const result = await sut.execute(transactionData);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(LockedError);
  })
} )