/**
 * 缓存键常量定义
 * 统一管理所有缓存键，避免键名冲突
 */

export const CACHE_KEYS = {
  // 全局不变数据
  DOCUO_CONFIG: 'docuo_config',
  INSTANCES: 'instances',
  ALL_SLUGS: 'all_slugs',
  
  // 基于语言的数据（需要语言参数）
  DISPLAY_INSTANCES: 'display_instances',
  DISPLAY_LANGUAGES: 'display_languages',
  
  // 基于实例和语言的数据
  DISPLAY_GROUPS: 'display_groups',
  DISPLAY_PLATFORMS: 'display_platforms',
  DISPLAY_CATEGORIES: 'display_categories',
  DISPLAY_TABS: 'display_tabs',
  
  // 基于实例和版本的数据
  USED_VERSIONS: 'used_versions',
  FOLDER_TREE_DATA: 'folder_tree_data',
  SIDEBARS: 'sidebars',
  
  // 基于slug的数据
  DISPLAY_VERSIONS: 'display_versions',
  EXTRACT_INFO: 'extract_info',
  PAGER_DATA: 'pager_data',
  
  // MDX相关数据
  MDX_CONTENT: 'mdx_content',
  TOC_DATA: 'toc_data',
  FRONTMATTER: 'frontmatter',
} as const;

export const CACHE_PREFIXES = {
  LANGUAGE: 'lang',
  INSTANCE: 'inst',
  VERSION: 'ver',
  SLUG: 'slug',
  MDX: 'mdx',
} as const;

/**
 * 生成基于语言的缓存键
 * @param baseKey 基础键名
 * @param language 语言代码
 */
export const getLanguageCacheKey = (baseKey: string, language: string): string => {
  return `${CACHE_PREFIXES.LANGUAGE}:${language}:${baseKey}`;
};

/**
 * 生成基于实例的缓存键
 * @param baseKey 基础键名
 * @param instanceId 实例ID
 */
export const getInstanceCacheKey = (baseKey: string, instanceId: string): string => {
  return `${CACHE_PREFIXES.INSTANCE}:${instanceId}:${baseKey}`;
};

/**
 * 生成基于版本的缓存键
 * @param baseKey 基础键名
 * @param instanceId 实例ID
 * @param version 版本号
 */
export const getVersionCacheKey = (baseKey: string, instanceId: string, version: string): string => {
  return `${CACHE_PREFIXES.VERSION}:${instanceId}:${version}:${baseKey}`;
};

/**
 * 生成基于slug的缓存键
 * @param baseKey 基础键名
 * @param slug slug数组
 */
export const getSlugCacheKey = (baseKey: string, slug: string[]): string => {
  return `${CACHE_PREFIXES.SLUG}:${slug.join('/')}:${baseKey}`;
};

/**
 * 生成MDX相关的缓存键
 * @param baseKey 基础键名
 * @param filePath 文件路径
 */
export const getMdxCacheKey = (baseKey: string, filePath: string): string => {
  return `${CACHE_PREFIXES.MDX}:${filePath}:${baseKey}`;
};

/**
 * 生成组合缓存键
 * @param baseKey 基础键名
 * @param params 参数对象
 */
export const getCombinedCacheKey = (baseKey: string, params: Record<string, string>): string => {
  const paramStr = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b)) // 确保参数顺序一致
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
  return `${baseKey}:${paramStr}`;
};

/**
 * 缓存配置预设
 */
export const CACHE_CONFIGS = {
  // 全局数据 - 永不过期，开发环境禁用
  GLOBAL: {
    ttl: 0,
    disableInDev: true,
  },
  
  // 语言相关数据 - 长期缓存
  LANGUAGE: {
    ttl: 30 * 60 * 1000, // 30分钟
    disableInDev: false,
  },
  
  // 内容相关数据 - 中期缓存
  CONTENT: {
    ttl: 10 * 60 * 1000, // 10分钟
    disableInDev: false,
  },
  
  // 动态数据 - 短期缓存
  DYNAMIC: {
    ttl: 5 * 60 * 1000, // 5分钟
    disableInDev: false,
  },
  
  // 开发环境 - 不缓存
  DEVELOPMENT: {
    ttl: 0,
    disableInDev: true,
  },
} as const;
