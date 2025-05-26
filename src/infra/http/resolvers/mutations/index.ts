import { prisma } from "../../database/prisma"

export const MUTATIONS = {
  createTransaction: async () => {
    const result = await prisma.user.findMany()
    console.log('result', result)
    return {
      originAccountId: '123',
    }
  }
}