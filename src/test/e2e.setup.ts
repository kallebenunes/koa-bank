import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Create a new Prisma client for e2e tests
const prisma = new PrismaClient();

// Connect to the database before all tests
beforeAll(async () => {
  await prisma.$connect();
});

// Clean up database after all tests
afterAll(async () => {
  await prisma.$disconnect();
});

// Clean up database after each test
afterEach(async () => {
  // Get all collections from the database
  const result = (await prisma.$runCommandRaw({ listCollections: 1 })) as {
    cursor: {
      firstBatch: Array<{ name: string }>;
    };
  };

  // Drop all collections except system collections
  for (const collection of result.cursor.firstBatch) {
    const name = collection.name;
    if (!name.startsWith("system.")) {
      await prisma.$runCommandRaw({ drop: name });
    }
  }
});
