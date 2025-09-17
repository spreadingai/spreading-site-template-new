import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface QRCodeProps {
  content: string;
  size?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  title?: string;
  showTitle?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const QRCode: React.FC<QRCodeProps> = ({
  content,
  size = 200,
  errorCorrectionLevel = 'M',
  title,
  showTitle = false,
  style = {},
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [themeVersion, setThemeVersion] = useState(0); // 用于强制重新生成二维码

  // 检测是否在客户端
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 监听主题变化，重新生成二维码
  useEffect(() => {
    if (!isClient) return;

    const observer = new MutationObserver(() => {
      // 主题变化时，触发二维码重新生成
      setThemeVersion(prev => prev + 1);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, [isClient]);

  // 生成二维码
  useEffect(() => {
    if (!isClient || !content || !containerRef.current) return;

    let isMounted = true;

    const loadAndCreateQRCode = async () => {
      try {
        // 确保QRCode库已加载
        if (!(window as any).QRCode) {
          // 动态加载qrcodejs库
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (!isMounted || !containerRef.current) return;

        // 清空容器
        containerRef.current.innerHTML = '';

        // 映射错误纠正级别
        const correctLevelMap = {
          'L': (window as any).QRCode.CorrectLevel.L,
          'M': (window as any).QRCode.CorrectLevel.M,
          'Q': (window as any).QRCode.CorrectLevel.Q,
          'H': (window as any).QRCode.CorrectLevel.H
        };

        // 从 CSS 变量获取颜色
        const computedStyle = getComputedStyle(document.documentElement);
        const qrDarkColor = computedStyle.getPropertyValue('--docuo-qr-dark-color').trim() || '#000000';
        const qrLightColor = computedStyle.getPropertyValue('--docuo-qr-light-color').trim() || '#ffffff';

        // 创建二维码
        new (window as any).QRCode(containerRef.current, {
          text: content,
          width: size,
          height: size,
          colorDark: qrDarkColor,
          colorLight: qrLightColor,
          correctLevel: correctLevelMap[errorCorrectionLevel] || (window as any).QRCode.CorrectLevel.M
        });

        if (isMounted) {
          setError(null);
        }
      } catch (err) {
        console.error('QRCode generation error:', err);
        if (isMounted) {
          setError('二维码生成失败');
        }
      }
    };

    loadAndCreateQRCode();

    return () => {
      isMounted = false;
    };
  }, [isClient, content, size, errorCorrectionLevel, themeVersion]);

  // 服务端渲染时显示占位符
  if (!isClient) {
    return (
      <div 
        className={`${styles.placeholder} ${className}`}
        style={{
          width: size,
          height: size,
          ...style
        }}
      >
        二维码加载中...
      </div>
    );
  }

  if (!content) {
    return (
      <div 
        className={`${styles.error} ${className}`}
        style={{
          width: size,
          height: size,
          ...style
        }}
      >
        请提供content属性
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`${styles.error} ${styles.errorState} ${className}`}
        style={{
          width: size,
          height: size,
          ...style
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${className}`} style={{ ...style }}>
      {showTitle && title && (
        <div className={styles.title}>
          {title}
        </div>
      )}
      <div ref={containerRef} className={styles.qrContainer} />
      {showTitle && !title && (
        <div 
          className={styles.contentPreview}
          style={{ maxWidth: size }}
        >
          {content.length > 50 ? content.substring(0, 50) + '...' : content}
        </div>
      )}
    </div>
  );
};

export { QRCode };
