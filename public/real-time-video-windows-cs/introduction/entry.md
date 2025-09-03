/**
 * FestureList
 *
 * Props:
 * - type: string，在左上角显示的小标签
 * - features: Array<string | { title: string, tag?: string, tag_color?: '红'|'黄'|'蓝'|'red'|'yellow'|'blue' }>
 *   - 如果为字符串，等价于 { title: str }
 *   - tag_color 支持中英文同义词，背景为浅色，文字为深色
 *
 * 布局：按顺序从左到右，一行最多 4 列，超过换行。
 */
export default function FeatureList({ type, features = [] }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const typeTextColor = '#28292e';
  const openLinkInNewTab = (url) => {
    if (!url) return;
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        newWindow.opener = null;
      }
    } catch (error) {
      // 忽略
    }
  };
  // 响应式：移动端显示为一列
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkIsMobile = () => {
      try {
        setIsMobile(window.innerWidth <= 768);
      } catch (e) {
        setIsMobile(false);
      }
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  const colorThemeMap = {
    red: {
      backgroundColor: '#ffecef', // 文档站风格：实色浅底
      color: '#c81e42',
    },
    yellow: {
      backgroundColor: '#fff6e5',
      color: '#a16207',
    },
    blue: {
      backgroundColor: '#eef3ff',
      color: '#1e40af',
    },
  };

  const normalizeColorKey = (color) => {
    if (!color) return 'blue';
    const value = String(color).toLowerCase();
    if (value.includes('红') || value === 'red') return 'red';
    if (value.includes('黄') || value === 'yellow') return 'yellow';
    return 'blue';
  };

  const normalizedFeatures = Array.isArray(features)
    ? features.map((item) => {
        if (typeof item === 'string') {
          return { title: item };
        }
        const { title, tag, tag_color, link } = item || {};
        // 如果未显式指定颜色，按常见标记词推断
        let inferredColor = tag_color;
        if (!inferredColor && typeof tag === 'string') {
          const t = tag.toLowerCase();
          if (t.includes('hot')) inferredColor = 'red';
          if (t.includes('new')) inferredColor = 'blue';
        }
        return {
          title: title || '',
          tag: tag || undefined,
          tag_color: normalizeColorKey(inferredColor),
          link: link || undefined,
        };
      })
    : [];

  const containerStyle = {
    position: 'relative',
    padding: '16px 24px 16px',
    borderRadius: 4,
    border: '1px solid #f7f7f8',
    background: '#fafafa',
  };

  const typeBadgeWrapperStyle = {
    position: 'absolute',
    top: -10,
    left: 0,
    height: 20,
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '4px 0 0 0', // 左上与容器一致，左下直角
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const typeBadgeInnerStyle = {
    padding: '0 12px 0 8px',
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: '18px',
    background: '#ededed',
    color: typeTextColor,
    clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)',
  };

  const gridStyle = React.useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(1, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
    columnGap: isMobile ? 0 : 24,
    rowGap: 12,
  }), [isMobile]);

  const itemStyle = {
    minHeight: 28,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '#0f172a',
    fontSize: 14,
    lineHeight: '20px',
  };

  const bulletStyle = {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#94a3b8',
    flex: '0 0 auto',
  };

  const tagBaseStyle = {
    padding: '0 6px',
    height: 20, // 与 title 文本行高一致
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 4, // 更小的圆角
    fontSize: 9, // 字体更小
    lineHeight: '20px',
    border: 'none',
    flex: '0 0 auto',
  };

  return (
    <div style={containerStyle}>
      {type ? (
        <div style={typeBadgeWrapperStyle}>
          <div style={typeBadgeInnerStyle}>{type}</div>
        </div>
      ) : null}
      <div style={gridStyle}>
        {normalizedFeatures.map((feature, index) => {
          const key = `${feature.title || 'feature'}-${index}`;
          const hasTag = Boolean(feature.tag);
          const theme = colorThemeMap[normalizeColorKey(feature.tag_color)];
          return (
            <div key={key} style={itemStyle}>
              <span style={bulletStyle} />
              {feature.link ? (
                <span
                  role="link"
                  tabIndex={0}
                  onClick={() => openLinkInNewTab(feature.link)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLinkInNewTab(feature.link);
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    color: hoveredIndex === index ? '#1e40af' : typeTextColor,
                    textDecoration: 'none',
                    fontWeight: 400,
                    fontSize: 14,
                    cursor: 'pointer',
                    marginRight: hasTag ? 4 : 0,
                  }}
                >
                  {feature.title}
                </span>
              ) : (
                <span style={{ marginRight: hasTag ? 4 : 0 }}>{feature.title}</span>
              )}
              {hasTag ? (
                <span style={{ ...tagBaseStyle, ...theme }}>{feature.tag}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}



# <img src="https://doc-media.zego.im/sdk-doc/Pics/DeveloperCenter/homePage/product_img/icon_shishiyinshipin.png" alt="实时音视频" style={{display: 'inline', marginRight: '8px', verticalAlign: 'middle', width: '32px', height: '32px'}} /> 实时音视频

支持全球超低延迟多人视频、音频互动，为开发者提供便捷接入、高可靠、多平台互通的音视频服务。

<Button primary-color="NavyBlue" target="_blank" href="/real-time-video-windows-cs/client-sdk/download-sdk">下载 SDK</Button>
<Button primary-color="NavyBlue" target="_blank" href="/real-time-video-windows-cs/quick-start/implementing-video-call">快速开始</Button>
<Button primary-color="NavyBlue" target="_blank" href="/real-time-voice-video-api/overview">客户端 API</Button>
<Button primary-color="NavyBlue" target="_blank" href="/real-time-video-server/api-reference/overview">服务端 API</Button>

---

<Steps titleSite="h3">
  <Step title="产品介绍" icon="https://doc-media.zego.im/sdk-doc/Pics/Express/overview_catalog/icon_documentation_jianjie.png">
    <FeatureList
      features={        [
                {
                        "title": "概述",
                        "link": "/real-time-video-windows-cs/introduction/overview"
                },
                {
                        "title": "产品功能",
                        "link": "/real-time-video-windows-cs/introduction/product-feature-list"
                },
                {
                        "title": "实时音视频价格说明",
                        "link": "/real-time-video-windows-cs/introduction/pricing/rtc"
                },
                {
                        "title": "服务端混流价格说明",
                        "link": "/real-time-video-windows-cs/introduction/pricing/server-side-stream-mixing"
                },
                {
                        "title": "CDN 直播价格说明",
                        "link": "/real-time-video-windows-cs/introduction/pricing/cdn-live-streaming"
                }
        ]}
    />
  </Step>
  <Step title="快速开始" icon="https://doc-media.zego.im/sdk-doc/Pics/Express/overview_catalog/icon_documentation_kuaisukaishi.png">
    <FeatureList
      features={        [
                {
                        "title": "跑通示例源码",
                        "link": "/real-time-video-windows-cs/quick-start/run-example-code"
                },
                {
                        "title": "集成 SDK",
                        "link": "/real-time-video-windows-cs/quick-start/integrating-sdk"
                },
                {
                        "title": "实现视频通话",
                        "link": "/real-time-video-windows-cs/quick-start/implementing-video-call"
                }
        ]}
    />
  </Step>
  <Step title="参考文档" icon="https://doc-media.zego.im/sdk-doc/Pics/Express/overview_catalog/icon_documentation_cankaowendang.png">
    <FeatureList
      features={      [
            {
                  "title": "客户端 API",
                  "link": "/real-time-voice-video-api/overview"
            },
            {
                  "title": "服务端 API",
                  "link": "/real-time-video-server/api-reference/overview"
            },
            {
                  "title": "常见错误码",
                  "link": "/real-time-video-windows-cs/client-sdk/error-code"
            },
            {
                  "title": "常见问题",
                  "link": "/faq/overview"
            }
      ]}
    />
  </Step>
</Steps>