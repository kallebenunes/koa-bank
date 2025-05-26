import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { graphqlHTTP } from "koa-graphql";
import { buildSchema } from "graphql";
import { PrismaClient } from "@prisma/client";
import Router from "@koa/router";
import { config } from "./config";

export const prisma = new PrismaClient();

export const app = new Koa();
export const router = new Router();
// GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    name: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(id: ID!, email: String, name: String): User
    deleteUser(id: ID!): User
  }
`);

// Root resolver
const root = {
  // Queries
  users: async () => {
    return prisma.user.findMany();
  },
  user: async ({ id }: { id: string }) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  // Mutations
  createUser: async ({ email, name }: { email: string; name?: string }) => {
    return prisma.user.create({
      data: { email, name },
    });
  },
  updateUser: async ({
    id,
    email,
    name,
  }: {
    id: string;
    email?: string;
    name?: string;
  }) => {
    return prisma.user.update({
      where: { id },
      data: { email, name },
    });
  },
  deleteUser: async ({ id }: { id: string }) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};

// Middleware
app.use(cors(config.cors));
app.use(bodyParser());

router.get('/health', (ctx)=>{
  ctx.status = 200
  ctx.body = {
    health: 'ok'
  }
})

router.all(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    const err = error as Error & { status?: number };
    ctx.status = err.status || 500;
    ctx.body = {
      error: {
        message: err.message || "Internal Server Error",
        status: ctx.status,
      },
    };
    ctx.app.emit("error", err, ctx);
  }
});

app.use(router.routes()).use(router.allowedMethods());

// Start server
export const startServer = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    console.log("📦 Connected to database");

    // Start server
    app.listen(config.port, () => {
      console.log(`🚀 Server ready at http://localhost:${config.port}`);
      console.log(
        `📊 GraphQL Playground available at http://localhost:${config.port}/graphql`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});
