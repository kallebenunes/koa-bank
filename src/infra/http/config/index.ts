import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string(),

  // DB
  DATABASE_URL: z.string(),

  // Redis
  REDIS_HOST: z.string(), 
  REDIS_PORT: z.coerce.number(),
  REDIS_DB: z.coerce.number(),

  // Cache Time
  DEFAULT_CACHE_TIME: z.coerce.number().default(30000), // 30 seconds,
  
});


const validatedEnv = envSchema.parse(process.env);

export const config = {
  port: validatedEnv.PORT,
  nodeEnv: validatedEnv.NODE_ENV,
  database: {
    url: validatedEnv.DATABASE_URL,
  },
  cors: {
    origin: validatedEnv.CORS_ORIGIN,
  },
  redisHost: validatedEnv.REDIS_HOST,
  redisPort: validatedEnv.REDIS_PORT,
  redisDb: validatedEnv.REDIS_DB,
  defaultCacheTime: validatedEnv.DEFAULT_CACHE_TIME,
} as const;


export type Config = typeof config;