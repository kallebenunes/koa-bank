import { config } from '../../config'
import { CacheOtions, CacheRepository } from '../cache-repository'
import { Redis } from 'ioredis'

export class RedisCacheRepository implements CacheRepository {
  constructor(private redis: Redis) {}

  async set(key: string, value: string, options: CacheOtions): Promise<void> {
    await this.redis.set(key, value, 'EX', options?.ttl || config.defaultCacheTime)
  }

  get(key: string): Promise<string | null> {
    return this.redis.get(key)
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
