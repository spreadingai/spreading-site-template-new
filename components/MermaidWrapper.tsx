import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidWrapperProps {
  chart?: string;
  children?: string;
  config?: any;
}

const MermaidWrapper: React.FC<MermaidWrapperProps> = ({ chart, children, config = {} }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 获取图表内容，优先使用 chart，然后是 children
    const chartContent = chart || children;

    if (!chartContent || !elementRef.current) {
      console.warn('Mermaid: No chart content provided');
      return;
    }

    // 初始化 mermaid 配置
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      ...config
    });

    // 清空之前的内容
    elementRef.current.innerHTML = '';

    // 生成唯一的 ID
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    // 渲染图表
    mermaid.render(id, chartContent).then(({ svg }) => {
      if (elementRef.current) {
        elementRef.current.innerHTML = svg;
      }
    }).catch((error) => {
      console.error('Mermaid rendering error:', error);
      if (elementRef.current) {
        elementRef.current.innerHTML = `
          <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px;">
            <h4>Mermaid 渲染错误</h4>
            <p>图表语法可能有误，请检查语法是否正确。</p>
            <details>
              <summary>错误详情</summary>
              <pre>${error.message}</pre>
              <pre>Chart content: ${chartContent}</pre>
            </details>
          </div>
        `;
      }
    });
  }, [chart, children, config]);

  return <div ref={elementRef} className="mermaid-wrapper" />;
};

export default MermaidWrapper;
