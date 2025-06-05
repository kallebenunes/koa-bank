import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { config } from "./config";
import { router } from "./routes/router";
import { prisma } from "./database/prisma";

export const app = new Koa();

app.use(cors(config.cors));
app.use(bodyParser());


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
    
    await prisma.$connect();
    console.log("📦 Connected to database");
    
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
