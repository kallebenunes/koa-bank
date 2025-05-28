import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Account, AccountProps } from "@/domain/bank/enterprise/entities/Account"

export function makeAccount(
  override: Partial<AccountProps> = {},
  id?: UniqueEntityID,
) {
  const account = Account.create(
    {
      balance: 0,
      customerId: new UniqueEntityID('customer-id'),
      transactions: [],
      createdAt: new Date(),
      updatedAt: null,
      
      ...override,
    },
    id,
  )

  return account
}

export function makeAccountsList(){

  const accountsList: Account[] = []

  for(let i = 0; i < 10; i++) {
    accountsList.push(makeAccount())
  }

  return accountsList
}