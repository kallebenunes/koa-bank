import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Account } from "@/domain/bank/enterprise/entities/Account"
import { Prisma, Account as PrismaAccount } from "@prisma/client"

export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        balance: raw.balance,
        customerId: new UniqueEntityID(raw.userId),
        transactions: [],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
  static toPrisma(Account: Account): Prisma.AccountUncheckedCreateInput {
    return {
      id: Account.id.toString(),
      userId: Account.customerId.toString(),
      balance: Account.balance,
    }
  }
}
