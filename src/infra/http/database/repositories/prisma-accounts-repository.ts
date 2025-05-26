import { AccountsRepository } from "@/domain/bank/application/repositories/accounts-repository";
import { TransactionsRepository } from "@/domain/bank/application/repositories/transactions-repository";
import { Account } from "@/domain/bank/enterprise/entities/Account";
import { Transaction } from "@/domain/bank/enterprise/entities/Transaction";
import { prisma } from "../prisma";
import { PrismaAccountMapper } from "../mappers/AccountMapper";


export class PrismaAccountsRepository implements AccountsRepository {

  constructor(private transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }
  async create(account: Account): Promise<Account> {
    const raw = PrismaAccountMapper.toPrisma(account);
    const createdAccount = await prisma.account.create({
      data: raw,
    })
    return PrismaAccountMapper.toDomain(createdAccount);
  }
  async save(account: Account): Promise<void> {
    await prisma.account.update({
      where: { id: account.id.toString() },
      data: {
        balance: account.balance,
        updatedAt: new Date(),
      },
    })
  }
  async findById(id: string): Promise<Account | null> {
     const account = await prisma.account.findUnique({
      where: { id: id },
      include: {
        receivedTransactions: {
          take: 10, // First 10 received transactions
          orderBy: { createdAt: 'desc' } // Optional: order by most recent
        },
        sentTransactions: {
          take: 10, // First 10 sent transactions
          orderBy: { createdAt: 'desc' } // Optional: order by most recent
        },
        _count: {
          select: {
            receivedTransactions: true,
            sentTransactions: true,
          },
        },
      },
    });

    if (!account) {
      return null;
    }

    return PrismaAccountMapper.toDomain(account);

  }
  async findByCustomerId(customerId: string): Promise<Account | null> {
    console.log(customerId)
    throw new Error("Method not implemented.");
  }
  async settleTransaction(transaction: Transaction, originAccount: Account, destinationAccount: Account): Promise<void> {
    console.log(transaction, originAccount, destinationAccount)
    
  }
  
}