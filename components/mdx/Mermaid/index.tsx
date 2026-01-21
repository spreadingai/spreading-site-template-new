import React, { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import styles from './index.module.scss';

interface MermaidProps {
  chart?: string;
  children?: string;
  config?: any;
  height?: number;
}

// 全局主题管理
let currentTheme: 'default' | 'dark' = 'default';
let themeObserver: MutationObserver | null = null;
const themeListeners = new Set<() => void>();

// 初始化全局主题监听（只创建一次）
const initThemeObserver = () => {
  if (typeof window === 'undefined' || themeObserver) return;

  currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default';

  themeObserver = new MutationObserver(() => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default';
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      // 通知所有监听器
      themeListeners.forEach(listener => listener());
    }
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
};

const Mermaid: React.FC<MermaidProps> = ({ chart, children, config = {}, height = 512 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayScale, setDisplayScale] = useState(1); // 只用于显示百分比

  // 使用 ref 存储实际的缩放和位置值，避免频繁重新渲染
  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // 渲染 mermaid 图表
  const renderChart = useCallback(() => {
    const chartContent = chart || children;
    if (!chartContent) {
      console.warn('Mermaid: No chart content provided');
      return;
    }

    // 使用当前主题重新初始化
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme,
      securityLevel: 'loose',
    });

    const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;

    mermaid.render(id, chartContent).then(({ svg }) => {
      setSvgContent(svg);
    }).catch((error) => {
      console.error('Mermaid rendering error:', error);
      setSvgContent(`
        <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px;">
          <pre>${error.message}</pre>
        </div>
      `);
    });
  }, [chart, children]);

  // 初始渲染
  useEffect(() => {
    initThemeObserver();
    renderChart();
  }, [renderChart]);

  // 监听主题变化
  useEffect(() => {
    const handleThemeChange = () => {
      renderChart();
    };

    themeListeners.add(handleThemeChange);
    return () => {
      themeListeners.delete(handleThemeChange);
    };
  }, [renderChart]);

  // 直接更新 DOM transform，避免触发重新渲染
  const updateTransform = useCallback(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.style.transform =
        `translate(${positionRef.current.x}px, ${positionRef.current.y}px) scale(${scaleRef.current})`;
    }
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
    setDisplayScale(1);
    document.body.style.overflow = 'hidden';
    // 下一帧初始化 transform
    requestAnimationFrame(() => {
      if (svgContainerRef.current) {
        svgContainerRef.current.style.transform = 'translate(0px, 0px) scale(1)';
        svgContainerRef.current.style.cursor = 'grab';
      }
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scaleRef.current = Math.min(Math.max(0.1, scaleRef.current + delta), 5);
    updateTransform();

    // 使用 RAF 节流更新显示的缩放值
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      setDisplayScale(scaleRef.current);
    });
  }, [updateTransform]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y
    };
    if (svgContainerRef.current) {
      svgContainerRef.current.style.cursor = 'grabbing';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    positionRef.current = {
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    };
    updateTransform();
  }, [updateTransform]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (svgContainerRef.current) {
      svgContainerRef.current.style.cursor = 'grab';
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
          document.body.style.overflow = '';
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen]);

  // 清理 RAF
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={elementRef}
        className={styles.wrapper}
        style={{ height: `${height}px` }}
        onClick={openModal}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalHeader}>
            <span className={styles.zoomInfo}>缩放: {Math.round(displayScale * 100)}%</span>
            <button className={styles.closeButton} onClick={closeModal}>✕</button>
          </div>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              ref={svgContainerRef}
              className={styles.svgContainer}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Mermaid;

