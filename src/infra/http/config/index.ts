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
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  redisDb: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 0,
} as const;

export type Config = typeof config;
