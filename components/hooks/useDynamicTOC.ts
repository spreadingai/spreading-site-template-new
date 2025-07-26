import { useEffect, useState, useCallback } from 'react';
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
 * 这个hook会在页面内容变化时重新扫描heading元素
 */
export const useDynamicTOC = (containerSelector = '.article-content') => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // 移除特殊字符
      .replace(/\s+/g, '-') // 空格替换为连字符
      .trim();
  };

  const scanHeadings = useCallback(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return [];

    // 扫描所有的heading元素 (h1-h6)
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

      if (isInSearchableContent || isInCodeGroup || hasNoTocClass || isInNavigation) {
        return; // 跳过这个标题
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

  const updateTOC = useCallback(() => {
    const headings = scanHeadings();
    if (headings.length > 0) {
      const tocData = parseHeadingsToTocs(headings);
      setToc(tocData);
    } else {
      setToc([]);
    }
  }, [scanHeadings]);

  useEffect(() => {
    // 初始扫描
    updateTOC();

    // 创建MutationObserver来监听DOM变化
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach((mutation) => {
        // 检查是否有新增或删除的heading元素
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);
          
          const hasHeadingChanges = [...addedNodes, ...removedNodes].some((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              // 检查是否是heading元素或包含heading元素
              return element.matches('h1, h2, h3, h4, h5, h6') || 
                     element.querySelector('h1, h2, h3, h4, h5, h6');
            }
            return false;
          });
          
          if (hasHeadingChanges) {
            shouldUpdate = true;
          }
        }
        
        // 检查heading元素的文本内容是否发生变化
        if (mutation.type === 'characterData' || mutation.type === 'attributes') {
          const target = mutation.target;
          if (target.nodeType === Node.ELEMENT_NODE) {
            const element = target as Element;
            if (element.matches('h1, h2, h3, h4, h5, h6')) {
              shouldUpdate = true;
            }
          }
        }
      });
      
      if (shouldUpdate) {
        // 使用setTimeout来避免频繁更新
        setTimeout(updateTOC, 100);
      }
    });

    // 开始观察
    const container = document.querySelector(containerSelector);
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['id']
      });
    }

    // 清理函数
    return () => {
      observer.disconnect();
    };
  }, [containerSelector, updateTOC]);

  return {
    toc,
    updateTOC, // 手动触发更新的方法
  };
};
