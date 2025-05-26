import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  database: {
    url:
      process.env.DATABASE_URL ||
      "mongodb://root:example@localhost:27017/development?authSource=admin",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
} as const;

export type Config = typeof config;
