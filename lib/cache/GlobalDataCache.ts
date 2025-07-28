/**
 * 全局数据缓存管理器
 * 用于优化 getStaticProps 中的重复计算问题
 */

export interface CacheOptions {
  /** 缓存过期时间（毫秒），0表示永不过期 */
  ttl?: number;
  /** 是否在开发环境中禁用缓存 */
  disableInDev?: boolean;
  /** 缓存键前缀 */
  prefix?: string;
}

export interface CacheEntry<T = any> {
  value: T;
  timestamp: number;
  ttl: number;
}

export class GlobalDataCache {
  private static instance: GlobalDataCache;
  private cache = new Map<string, CacheEntry>();
  private readonly isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): GlobalDataCache {
    if (!GlobalDataCache.instance) {
      GlobalDataCache.instance = new GlobalDataCache();
    }
    return GlobalDataCache.instance;
  }

  /**
   * 获取或计算缓存值
   * @param key 缓存键
   * @param computeFn 计算函数
   * @param options 缓存选项
   */
  getOrCompute<T>(
    key: string,
    computeFn: () => T,
    options: CacheOptions = {}
  ): T {
    const {
      ttl = 0,
      disableInDev = false,
      prefix = ''
    } = options;

    // 开发环境下可选择禁用缓存
    if (this.isDevelopment && disableInDev) {
      return computeFn();
    }

    const fullKey = prefix ? `${prefix}:${key}` : key;
    const cached = this.cache.get(fullKey);

    // 检查缓存是否存在且未过期
    if (cached && this.isValid(cached)) {
      // 只在开发环境显示缓存命中日志
      if (this.isDevelopment) {
        console.log(`[GlobalDataCache] Cache hit: ${fullKey}`);
      }
      return cached.value;
    }

    // 计算新值 - 总是显示缓存未命中
    console.log(`[GlobalDataCache] Cache miss, computing: ${fullKey}`);
    const value = computeFn();
    
    // 存储到缓存
    this.set(fullKey, value, ttl);
    
    return value;
  }

  /**
   * 设置缓存值
   * @param key 缓存键
   * @param value 缓存值
   * @param ttl 过期时间（毫秒）
   */
  set<T>(key: string, value: T, ttl: number = 0): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * 获取缓存值
   * @param key 缓存键
   */
  get<T>(key: string): T | undefined {
    const cached = this.cache.get(key);
    if (cached && this.isValid(cached)) {
      return cached.value;
    }
    return undefined;
  }

  /**
   * 删除缓存
   * @param key 缓存键，如果不提供则清空所有缓存
   */
  invalidate(key?: string): void {
    if (key) {
      this.cache.delete(key);
      console.log(`[GlobalDataCache] Invalidated: ${key}`);
    } else {
      this.cache.clear();
      console.log(`[GlobalDataCache] Cleared all cache`);
    }
  }

  /**
   * 根据前缀删除缓存
   * @param prefix 缓存键前缀
   */
  invalidateByPrefix(prefix: string): void {
    const keysToDelete: string[] = [];
    // 使用Array.from来兼容TypeScript配置
    const keys = Array.from(this.cache.keys());
    for (const key of keys) {
      if (key.startsWith(prefix)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
    console.log(`[GlobalDataCache] Invalidated ${keysToDelete.length} entries with prefix: ${prefix}`);
  }

  /**
   * 检查缓存条目是否有效
   * @param entry 缓存条目
   */
  private isValid(entry: CacheEntry): boolean {
    if (entry.ttl === 0) {
      return true; // 永不过期
    }
    return Date.now() - entry.timestamp < entry.ttl;
  }

  /**
   * 清理过期缓存
   */
  cleanup(): void {
    const keysToDelete: string[] = [];
    // 使用Array.from来兼容TypeScript配置
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (!this.isValid(entry)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
    console.log(`[GlobalDataCache] Cleaned up ${keysToDelete.length} expired entries`);
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): {
    totalEntries: number;
    validEntries: number;
    expiredEntries: number;
    memoryUsage: string;
  } {
    let validEntries = 0;
    let expiredEntries = 0;

    // 使用Array.from来兼容TypeScript配置
    const values = Array.from(this.cache.values());
    for (const entry of values) {
      if (this.isValid(entry)) {
        validEntries++;
      } else {
        expiredEntries++;
      }
    }

    return {
      totalEntries: this.cache.size,
      validEntries,
      expiredEntries,
      memoryUsage: `${Math.round(JSON.stringify(Array.from(this.cache.entries())).length / 1024)} KB`
    };
  }

  /**
   * 批量设置缓存
   * @param entries 缓存条目数组
   */
  setBatch<T>(entries: Array<{ key: string; value: T; ttl?: number }>): void {
    entries.forEach(({ key, value, ttl = 0 }) => {
      this.set(key, value, ttl);
    });
  }

  /**
   * 检查缓存是否存在
   * @param key 缓存键
   */
  has(key: string): boolean {
    const cached = this.cache.get(key);
    return cached ? this.isValid(cached) : false;
  }
}

// 导出单例实例
export const globalDataCache = GlobalDataCache.getInstance();

// 导出便捷函数
export const getOrCompute = <T>(
  key: string,
  computeFn: () => T,
  options?: CacheOptions
): T => globalDataCache.getOrCompute(key, computeFn, options);

export const invalidateCache = (key?: string): void => globalDataCache.invalidate(key);

export const invalidateCacheByPrefix = (prefix: string): void => 
  globalDataCache.invalidateByPrefix(prefix);

export default globalDataCache;
