/**
 * 缓存工具函数
 * 提供常用的缓存操作封装
 */

import { globalDataCache, CacheOptions } from './GlobalDataCache';
import {
  CACHE_KEYS,
  CACHE_CONFIGS,
  getLanguageCacheKey,
  getInstanceCacheKey,
  getVersionCacheKey,
  getSlugCacheKey,
  getCombinedCacheKey,
} from './CacheKeys';

/**
 * 缓存全局配置数据
 */
export const cacheGlobalData = {
  /**
   * 获取或计算 docuoConfig
   */
  getDocuoConfig: <T>(computeFn: () => T): T => {
    return globalDataCache.getOrCompute(
      CACHE_KEYS.DOCUO_CONFIG,
      computeFn,
      CACHE_CONFIGS.GLOBAL
    );
  },

  /**
   * 获取或计算 instances
   */
  getInstances: <T>(computeFn: () => T): T => {
    return globalDataCache.getOrCompute(
      CACHE_KEYS.INSTANCES,
      computeFn,
      CACHE_CONFIGS.GLOBAL
    );
  },

  /**
   * 获取或计算 allSlugs
   */
  getAllSlugs: <T>(computeFn: () => T): T => {
    return globalDataCache.getOrCompute(
      CACHE_KEYS.ALL_SLUGS,
      computeFn,
      CACHE_CONFIGS.GLOBAL
    );
  },
};

/**
 * 缓存基于语言的数据
 */
export const cacheLanguageData = {
  /**
   * 获取或计算 displayInstances
   */
  getDisplayInstances: <T>(language: string, computeFn: () => T): T => {
    const key = getLanguageCacheKey(CACHE_KEYS.DISPLAY_INSTANCES, language);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.LANGUAGE);
  },

  /**
   * 获取或计算 displayLanguages
   */
  getDisplayLanguages: <T>(slug: string[], computeFn: () => T): T => {
    const key = getSlugCacheKey(CACHE_KEYS.DISPLAY_LANGUAGES, slug);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.LANGUAGE);
  },

  /**
   * 获取或计算 displayGroups
   */
  getDisplayGroups: <T>(slug: string[], language: string, computeFn: () => T): T => {
    const key = getCombinedCacheKey(CACHE_KEYS.DISPLAY_GROUPS, {
      slug: slug.join('/'),
      language,
    });
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.LANGUAGE);
  },

  /**
   * 获取或计算 displayPlatforms
   */
  getDisplayPlatforms: <T>(slug: string[], language: string, computeFn: () => T): T => {
    const key = getCombinedCacheKey(CACHE_KEYS.DISPLAY_PLATFORMS, {
      slug: slug.join('/'),
      language,
    });
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.LANGUAGE);
  },

  /**
   * 获取或计算 displayCategories
   */
  getDisplayCategories: <T>(
    language: string,
    instanceId: string,
    displayGroups: any,
    computeFn: () => T
  ): T => {
    const key = getCombinedCacheKey(CACHE_KEYS.DISPLAY_CATEGORIES, {
      language,
      instanceId,
      groupsHash: JSON.stringify(displayGroups).slice(0, 50), // 简化hash
    });
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.LANGUAGE);
  },

  /**
   * 获取或计算 displayTabs
   */
  getDisplayTabs: <T>(slug: string[], language: string, computeFn: () => T): T => {
    const key = getCombinedCacheKey(CACHE_KEYS.DISPLAY_TABS, {
      slug: slug.join('/'),
      language,
    });
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.LANGUAGE);
  },
};

/**
 * 缓存基于实例和版本的数据
 */
export const cacheInstanceData = {
  /**
   * 获取或计算 usedVersions
   */
  getUsedVersions: <T>(instanceId: string, computeFn: () => T): T => {
    const key = getInstanceCacheKey(CACHE_KEYS.USED_VERSIONS, instanceId);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.CONTENT);
  },

  /**
   * 获取或计算 folderTreeData
   */
  getFolderTreeData: <T>(instanceId: string, version: string, computeFn: () => T): T => {
    const key = getVersionCacheKey(CACHE_KEYS.FOLDER_TREE_DATA, instanceId, version);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.CONTENT);
  },

  /**
   * 获取或计算 sidebars
   */
  getSidebars: <T>(instanceId: string, version: string, computeFn: () => T): T => {
    const key = getVersionCacheKey(CACHE_KEYS.SIDEBARS, instanceId, version);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.CONTENT);
  },
};

/**
 * 缓存基于slug的数据
 */
export const cacheSlugData = {
  /**
   * 获取或计算 displayVersions
   */
  getDisplayVersions: <T>(slug: string[], computeFn: () => T): T => {
    const key = getSlugCacheKey(CACHE_KEYS.DISPLAY_VERSIONS, slug);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.CONTENT);
  },

  /**
   * 获取或计算 extractInfo
   */
  getExtractInfo: <T>(slug: string[], computeFn: () => T): T => {
    const key = getSlugCacheKey(CACHE_KEYS.EXTRACT_INFO, slug);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.CONTENT);
  },

  /**
   * 获取或计算 pagerData
   */
  getPagerData: <T>(slug: string[], computeFn: () => T): T => {
    const key = getSlugCacheKey(CACHE_KEYS.PAGER_DATA, slug);
    return globalDataCache.getOrCompute(key, computeFn, CACHE_CONFIGS.CONTENT);
  },
};

/**
 * 缓存失效工具
 */
export const cacheInvalidation = {
  /**
   * 清除所有缓存
   */
  clearAll: (): void => {
    globalDataCache.invalidate();
  },

  /**
   * 清除全局数据缓存
   */
  clearGlobal: (): void => {
    globalDataCache.invalidate(CACHE_KEYS.DOCUO_CONFIG);
    globalDataCache.invalidate(CACHE_KEYS.INSTANCES);
    globalDataCache.invalidate(CACHE_KEYS.ALL_SLUGS);
  },

  /**
   * 清除特定语言的缓存
   */
  clearLanguage: (language: string): void => {
    globalDataCache.invalidateByPrefix(`lang:${language}`);
  },

  /**
   * 清除特定实例的缓存
   */
  clearInstance: (instanceId: string): void => {
    globalDataCache.invalidateByPrefix(`inst:${instanceId}`);
  },

  /**
   * 清除特定版本的缓存
   */
  clearVersion: (instanceId: string, version: string): void => {
    globalDataCache.invalidateByPrefix(`ver:${instanceId}:${version}`);
  },

  /**
   * 清除特定slug的缓存
   */
  clearSlug: (slug: string[]): void => {
    globalDataCache.invalidateByPrefix(`slug:${slug.join('/')}`);
  },
};

/**
 * 缓存监控工具
 */
export const cacheMonitoring = {
  /**
   * 获取缓存统计信息
   */
  getStats: () => {
    return globalDataCache.getStats();
  },

  /**
   * 清理过期缓存
   */
  cleanup: (): void => {
    globalDataCache.cleanup();
  },

  /**
   * 打印缓存状态
   */
  logStats: (): void => {
    const stats = globalDataCache.getStats();
    console.log('[CacheMonitoring] Cache Stats:', {
      total: stats.totalEntries,
      valid: stats.validEntries,
      expired: stats.expiredEntries,
      memory: stats.memoryUsage,
    });
  },
};

/**
 * 开发环境缓存工具
 */
export const devCacheUtils = {
  /**
   * 强制重新计算（忽略缓存）
   */
  forceRecompute: <T>(key: string, computeFn: () => T): T => {
    globalDataCache.invalidate(key);
    return computeFn();
  },

  /**
   * 预热缓存
   */
  warmup: (warmupFunctions: Array<() => void>): void => {
    console.log('[DevCacheUtils] Warming up cache...');
    warmupFunctions.forEach((fn, index) => {
      try {
        fn();
        console.log(`[DevCacheUtils] Warmup ${index + 1}/${warmupFunctions.length} completed`);
      } catch (error) {
        console.error(`[DevCacheUtils] Warmup ${index + 1} failed:`, error);
      }
    });
  },
};
