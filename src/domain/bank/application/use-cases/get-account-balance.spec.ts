import { GetAccountBalanceUseCase } from './get-account-balance';
import { Account } from '../../enterprise/entities/Account';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeMockAccountsRepository } from '@/test/mocks/repositories/mock-accounts-repository';
describe('GetAccountBalanceUseCase', () => {

  const mockAccountsRepository = makeMockAccountsRepository()
  const sut = new GetAccountBalanceUseCase(mockAccountsRepository)

  it('should return the account balance', async () => {
    
    const mockAccount = Account.create({
      balance: 1000,
      customerId: new UniqueEntityID('customer-id'),
      transactions: []
    }, new UniqueEntityID('account-id'))

    mockAccountsRepository.findById.mockResolvedValue(mockAccount)
    const {balance} = await sut.execute('account-id')
    expect(balance).toBe(1000)
    expect(mockAccountsRepository.findById).toHaveBeenCalledWith('account-id')
  })

})