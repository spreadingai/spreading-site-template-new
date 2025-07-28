/**
 * 缓存模块入口文件
 * 统一导出所有缓存相关功能
 */

// 核心缓存管理器
export {
  GlobalDataCache,
  globalDataCache,
  getOrCompute,
  invalidateCache,
  invalidateCacheByPrefix,
  type CacheOptions,
  type CacheEntry,
} from './GlobalDataCache';

// 缓存键常量
export {
  CACHE_KEYS,
  CACHE_PREFIXES,
  CACHE_CONFIGS,
  getLanguageCacheKey,
  getInstanceCacheKey,
  getVersionCacheKey,
  getSlugCacheKey,
  getCombinedCacheKey,
  getMdxCacheKey,
} from './CacheKeys';

// 缓存工具函数
export {
  cacheGlobalData,
  cacheLanguageData,
  cacheInstanceData,
  cacheSlugData,
  cacheInvalidation,
  cacheMonitoring,
  devCacheUtils,
} from './CacheUtils';

// 导入并重新导出默认实例
import { globalDataCache } from './GlobalDataCache';
export default globalDataCache;
