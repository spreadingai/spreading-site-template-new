import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import LibControllerImpl from "@/lib";
import SlugControllerImpl from "@/lib/slug-help";
import { DocuoConfig } from "@/lib/types";

interface Props {
  docuoConfig: DocuoConfig;
  firstSlug: string[];
}

export const getStaticProps = async () => {
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  const allSlugs = SlugControllerImpl.generateAllSlugs();
  const firstSlug = allSlugs[0] ? allSlugs[0].params.slug : [];
  
  return {
    props: {
      docuoConfig,
      firstSlug,
    },
  };
};

export default function Custom404({ docuoConfig, firstSlug }: Props) {
  const starsRef = useRef<HTMLDivElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('22vw');
  const [buttonMargin, setButtonMargin] = useState('-50px');
  
  const title = `Page Not Found - ${docuoConfig.title || "Docs"}`;

  // 创建星星背景
  const createStars = () => {
    if (!starsRef.current) return;
    
    starsRef.current.innerHTML = '';
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      
      // 随机大小 (1-3px)
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // 随机位置
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // 随机闪烁时间 (1-5秒)
      const duration = Math.random() * 4 + 1;
      star.style.animation = `twinkle ${duration}s infinite ease-in-out`;
      
      starsRef.current.appendChild(star);
    }
  };

  // 创建流星
  const createShootingStars = () => {
    if (!shootingStarsRef.current) return;
    
    shootingStarsRef.current.innerHTML = '';
    const count = 5;
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.width = '4px';
      star.style.height = '4px';
      star.style.background = 'linear-gradient(to right, rgba(0, 85, 255, 0), #0055FF)';
      star.style.borderRadius = '50%';
      star.style.filter = 'drop-shadow(0 0 6px #0055FF)';
      star.style.opacity = '0';
      
      // 随机起始位置
      star.style.left = `${Math.random() * 50}%`;
      star.style.top = `${Math.random() * 50}%`;
      
      // 随机动画时间 (3-8秒)
      const time = Math.random() * 5 + 3;
      const delay = Math.random() * 10;
      star.style.animation = `shoot ${time}s linear infinite`;
      star.style.animationDelay = `${delay}s`;
      
      shootingStarsRef.current.appendChild(star);
    }
  };

  // 处理响应式字体大小和按钮间距
  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setFontSize('35vw');
      setButtonMargin('20px'); // 移动端增加间距
    } else {
      setFontSize('22vw');
      setButtonMargin('-50px'); // PC端保持紧密
    }
  };

  useEffect(() => {
    // 初始设置字体大小
    handleResize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 添加CSS动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glow {
        from {
          text-shadow: 0 0 10px rgba(0, 85, 255, 0.5),
                       0 0 20px rgba(38, 110, 255, 0.3);
        }
        to {
          text-shadow: 0 0 20px rgba(0, 85, 255, 0.8),
                       0 0 30px rgba(38, 110, 255, 0.6),
                       0 0 40px rgba(102, 153, 255, 0.4);
        }
      }
      
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      
      @keyframes shoot {
        0% { transform: translateX(0) translateY(0); opacity: 1; }
        70% { opacity: 1; }
        100% { transform: translateX(1000px) translateY(300px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    // 创建星空
    createStars();
    createShootingStars();
    
    // 每隔一段时间创建新的流星
    const interval = setInterval(() => {
      createShootingStars();
    }, 3000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.head.removeChild(style);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #0a1628, #1a2332)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="抱歉，您访问的页面不存在" />
      </Head>
      
      {/* 星星背景 */}
      <div ref={starsRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      
      {/* 流星 */}
      <div ref={shootingStarsRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />
      
      {/* 404文字 */}
      <div style={{
        fontSize: fontSize,
        fontWeight: '800',
        background: 'linear-gradient(135deg, #0055FF, #266EFF, #4d7fff)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        marginBottom: '0px',
        textShadow: '0 0 20px rgba(0, 85, 255, 0.3)',
        animation: 'glow 3s ease-in-out infinite alternate'
      }}>
        404
      </div>
      
      {/* 返回按钮 */}
      <div style={{ marginTop: buttonMargin }}>
        {firstSlug.length > 0 ? (
          <Link 
            href={`/${firstSlug.join("/")}`}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #0055FF, #266EFF)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0, 85, 255, 0.4)',
              textDecoration: 'none',
              zIndex: 10,
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(38, 110, 255, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 85, 255, 0.4)';
            }}
          >
            Back to Home
          </Link>
        ) : (
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #0055FF, #266EFF)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0, 85, 255, 0.4)',
              textDecoration: 'none',
              zIndex: 10,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(38, 110, 255, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 85, 255, 0.4)';
            }}
          >
            返回
          </button>
        )}
      </div>
    </div>
  );
}