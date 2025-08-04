import { useEffect, useState, useCallback, useRef } from 'react';
import { parseHeadingsToTocs } from '../../plugins/utils';

interface HeadingData {
  level: number;
  id: string;
  title: string;
}

interface TOCItem {
  level: number;
  id: string;
  title: string;
  children?: TOCItem[];
}

/**
 * 动态扫描页面中的所有heading元素生成TOC
 * 使用更精确的触发机制，避免频繁的DOM监听
 */
export const useDynamicTOC = (containerSelector = '.article-content') => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [lastScanTime, setLastScanTime] = useState<number>(0);
  const [lastTocHash, setLastTocHash] = useState<string>('');
  const tocCacheRef = useRef<TOCItem[]>([]);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 移除特殊字符
      .replace(/\s+/g, '-') // 空格替换为连字符
      .trim();
  };

  const scanHeadings = useCallback(() => {
    // 服务端渲染时直接返回空数组
    if (typeof document === 'undefined') return [];

    const container = document.querySelector(containerSelector);
    if (!container) return [];

    // 扫描所有的heading元素 (h1-h6)，包括隐藏的Tab内容
    const headingElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headings: HeadingData[] = [];

    headingElements.forEach((element) => {
      const tagName = element.tagName.toLowerCase();
      const level = parseInt(tagName.replace('h', ''));
      const title = element.textContent?.trim() || '';

      if (!title) return;



      // 过滤掉不应该出现在TOC中的标题
      // 1. 检查是否在CodeBlock的隐藏搜索内容中
      const isInSearchableContent = element.closest('[data-searchable-content]') ||
                                   element.closest('.searchableContent');

      // 2. 检查是否在CodeGroup组件内部
      const isInCodeGroup = element.closest('[data-code-block]') ||
                           element.closest('.code-group') ||
                           element.closest('[class*="CodeGroup"]');

      // 3. 检查是否有特定的class表示不应该在TOC中
      const hasNoTocClass = element.classList.contains('no-toc') ||
                           element.classList.contains('skip-toc');

      // 4. 检查是否在特定的容器中（比如侧边栏、导航等）
      const isInNavigation = element.closest('nav') ||
                             element.closest('.sidebar') ||
                             element.closest('.navigation') ||
                             element.closest('header');

      // 5. 检查是否在隐藏的Tab内容中（但仍然要包含在TOC中）
      const isInHiddenTab = element.closest('.tabPaneHidden');

      if (isInSearchableContent || isInCodeGroup || hasNoTocClass || isInNavigation) {
        return; // 跳过这个标题
      }

      // 对于隐藏的Tab内容，我们仍然要包含在TOC中，但需要特殊处理
      if (isInHiddenTab) {
        // 为隐藏Tab中的标题添加特殊标记，但仍然包含在TOC中
        // 这样用户点击TOC时，可以自动切换到对应的Tab
      }

      let id = element.id;

      // 如果元素没有id，生成一个
      if (!id) {
        id = generateSlug(title);
        // 确保id唯一
        let counter = 1;
        let uniqueId = id;
        while (document.getElementById(uniqueId)) {
          uniqueId = `${id}-${counter}`;
          counter++;
        }
        element.id = uniqueId;
        id = uniqueId;
      }

      headings.push({
        level,
        id,
        title,
      });
    });

    return headings;
  }, [containerSelector]);

  // 生成TOC内容的哈希值，用于比较内容是否真的发生了变化
  const generateTocHash = useCallback((headings: HeadingData[]) => {
    return headings.map(h => `${h.level}-${h.id}-${h.title}`).join('|');
  }, []);

  const updateTOC = useCallback((forceUpdate = false) => {
    const now = Date.now();
    // 防止过于频繁的更新，但对于强制更新（如页面切换）允许更短的间隔
    const minInterval = forceUpdate ? 16 : 1000; // 16ms约等于一个动画帧
    if (!forceUpdate && now - lastScanTime < minInterval) {
      return;
    }

    const headings = scanHeadings();
    const newTocHash = generateTocHash(headings);

    // 只有当TOC内容真的发生变化时才更新，或者是强制更新
    if (forceUpdate || newTocHash !== lastTocHash) {
      let newTocData: TOCItem[] = [];
      if (headings.length > 0) {
        newTocData = parseHeadingsToTocs(headings);
      }

      // 使用深度比较，确保内容真的不同才更新state
      const newTocString = JSON.stringify(newTocData);
      const cachedTocString = JSON.stringify(tocCacheRef.current);

      if (forceUpdate || newTocString !== cachedTocString) {
        tocCacheRef.current = newTocData;
        setToc(newTocData);
      }

      setLastTocHash(newTocHash);
      setLastScanTime(now);
    }
  }, [scanHeadings, lastScanTime, lastTocHash, generateTocHash]);

  useEffect(() => {
    // 初始扫描
    updateTOC();

    // 只监听自定义的TOC更新事件（由组件主动触发）
    // 移除其他所有自动触发的事件监听
    const handleTOCUpdate = () => {
      setTimeout(updateTOC, 100);
    };

    // 监听页面路由变化，当URL的pathname变化时重新扫描TOC
    const handleRouteChange = () => {
      // 使用双重requestAnimationFrame确保DOM完全更新后执行
      // 第一个确保当前渲染周期完成，第二个确保下一个渲染周期开始
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateTOC(true);
        });
      });
    };

    // 只监听自定义TOC更新事件
    document.addEventListener('toc-update', handleTOCUpdate);

    // 监听popstate事件（浏览器前进后退）和自定义路由变化事件
    window.addEventListener('popstate', handleRouteChange);
    document.addEventListener('route-change', handleRouteChange);

    // 清理函数
    return () => {
      document.removeEventListener('toc-update', handleTOCUpdate);
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('route-change', handleRouteChange);
    };
  }, [containerSelector, updateTOC]);

  return {
    toc,
    updateTOC, // 手动触发更新的方法
  };
};
