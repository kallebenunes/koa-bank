export interface CacheOtions {
  ttl?: number;
}
export interface CacheRepository {
  set(key: string, value: string, options?: CacheOtions): Promise<void>
  get(key: string): Promise<string | null>
  delete(key: string): Promise<void>
}
