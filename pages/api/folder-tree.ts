import type { NextApiRequest, NextApiResponse } from 'next';
import TreeControllerImpl from '@/lib/tree-help';
import { FolderTreeData } from '@/lib/types';

interface ApiRequest extends NextApiRequest {
  body: {
    slug: string[];
  };
}

interface ApiResponse {
  success: boolean;
  data?: FolderTreeData[];
  error?: string;
}

// 简单的内存缓存
const cache = new Map<string, { data: FolderTreeData[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存

export default async function handler(
  req: ApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { slug } = req.body;

    // 验证输入参数
    if (!slug || !Array.isArray(slug)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid slug parameter'
      });
    }

    // 生成缓存键
    const cacheKey = `${slug.join('/')}`;
    const cached = cache.get(cacheKey);
    
    // 检查缓存
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      return res.status(200).json({
        success: true,
        data: cached.data
      });
    }

    // 调用原始方法获取数据
    const folderTreeData = TreeControllerImpl.getFolderTreeDataBySlug(slug);

    // 更新缓存
    cache.set(cacheKey, {
      data: folderTreeData,
      timestamp: Date.now()
    });

    // 清理过期缓存
    if (cache.size > 1000) {
      const now = Date.now();
      cache.forEach((value, key) => {
        if (now - value.timestamp > CACHE_TTL) {
          cache.delete(key);
        }
      });
    }

    // 设置缓存头
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return res.status(200).json({
      success: true,
      data: folderTreeData
    });

  } catch (error) {
    console.error('API Error in folder-tree:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
