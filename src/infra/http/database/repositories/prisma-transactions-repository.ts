import { PrismaTransactionMapper } from './../mappers/TransactionMapper';
import { TransactionsRepository } from "@/domain/bank/application/repositories/transactions-repository";
import { Transaction } from "@/domain/bank/enterprise/entities/Transaction";
import { prisma } from "../prisma";
import { PaginationParams } from '@/core/repositories/pagination-params';


export class PrismaTransactionsRepository implements TransactionsRepository {
  async findById(id: string): Promise<Transaction | null> {
  
    const transaction = await prisma.transaction.findUnique({
      where: { id: id },
    })

  return transaction ? PrismaTransactionMapper.toDomain(transaction) : null;
  }
  async findAll(paginationParams: PaginationParams): Promise<Transaction[]> {
    const { page, limit = 10 } = paginationParams;
    const transactions = await prisma.transaction.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return transactions.map(PrismaTransactionMapper.toDomain);
  }
  async save(transaction: Transaction): Promise<void> {
    const raw = PrismaTransactionMapper.toPrisma(transaction);
      await prisma.transaction.update({
      where: { id: transaction.id.toString() },
      data: raw,
    })

    return 
  }
  
}