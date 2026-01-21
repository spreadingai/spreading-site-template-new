import React, { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import styles from './index.module.scss';

interface MermaidProps {
  chart?: string;
  children?: string;
  config?: any;
  height?: number;
}

const Mermaid: React.FC<MermaidProps> = ({ chart, children, config = {}, height = 512 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState<'default' | 'dark'>('default');
  const modalContentRef = useRef<HTMLDivElement>(null);

  // 监听主题变化
  useEffect(() => {
    const getTheme = () => {
      const dataTheme = document.documentElement.getAttribute('data-theme');
      return dataTheme === 'dark' ? 'dark' : 'default';
    };
    setTheme(getTheme());

    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

  // 渲染 mermaid 图表
  useEffect(() => {
    const chartContent = chart || children;
    if (!chartContent) {
      console.warn('Mermaid: No chart content provided');
      return;
    }

    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: 'loose',
      ...config
    });

    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

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
  }, [chart, children, config, theme]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(0.1, prev + delta), 5));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, handleKeyDown]);

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
            <span className={styles.zoomInfo}>缩放: {Math.round(scale * 100)}%</span>
            <button className={styles.closeButton} onClick={closeModal}>✕</button>
          </div>
          <div
            className={styles.modalContent}
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className={styles.svgContainer}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Mermaid;

