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
      
      ...override,
    },
    id,
  )

  return account
}