
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'



const prisma = new PrismaClient()

async function main() {
  // Step 1: Create 10 Users with Accounts
  const users = await Promise.all(
    Array.from({ length: 100 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: 'hashed_password', 
          account: {
            create: {
              balance: faker.number.int({ min: 100, max: 1000 }),
            },
          },
        },
        include: { account: true },
      })
      return user
    })
  )

  // Get all accounts
  const accounts = users.map((u) => u.account!)

  // Step 2: For each account, create 20 transactions
  for (const senderAccount of accounts) {
    for (let i = 0; i < 20; i++) {
      // Pick a random recipient (not the same as sender)
      let receiverAccount = senderAccount
      while (receiverAccount.id === senderAccount.id) {
        receiverAccount = faker.helpers.arrayElement(accounts)
      }

      await prisma.transaction.create({
        data: {
          amount: faker.number.int({ min: 10, max: 200 }),
          originAccount: {
            connect: { id: senderAccount.id },
          },
          destinationAccount: {
            connect: { id: receiverAccount.id },
          },
        },
      })
    }
  }

  console.log('✅ Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    //eslint-disable-next-line
    //@ts-ignore
    process.exit(1) 
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
