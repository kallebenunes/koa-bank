import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  database: {
    url:
      process.env.DATABASE_URL ||
      "mongodb://localhost:27017/koa-bank?replicaSet=rs0&directConnection=true",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
} as const;

export type Config = typeof config;
