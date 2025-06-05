import { Redis } from 'ioredis'
import { config } from '../../config'


class RedisService extends Redis {
  private static instance: RedisService

  private constructor() {
    super({
      host: config.redisHost,
      port: config.redisPort,
      db: config.redisDb,
    })
  }

  static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService()
    }
    return RedisService.instance
  }
}

export const redis_connection = RedisService.getInstance()

export default RedisService
