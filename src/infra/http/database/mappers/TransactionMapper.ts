import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Transaction } from "@/domain/bank/enterprise/entities/Transaction"
import { Prisma, Transaction as PrismaTransaction } from "@prisma/client"

export class PrismaTransactionMapper {
  static toDomain(raw: PrismaTransaction): Transaction {
    return Transaction.create(
      {
        amount: raw.amount,
        destinationAccount: new UniqueEntityID(raw.destinationAccountId),
        originAccout: new UniqueEntityID(raw.originAccountId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
  static toPrisma(Transaction: Transaction): Prisma.TransactionUncheckedCreateInput {
    return {
      id: Transaction.id.toString(),
      originAccountId: Transaction.originAccount.toString(),
      destinationAccountId: Transaction.destinationAccount.toString(),
      amount: Transaction.amount,
      createdAt: Transaction.createdAt,
    }
  }
}
