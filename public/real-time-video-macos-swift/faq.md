
const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FaqFilters = ({ children, productData, platformData, language = 'zh', initialProduct, initialPlatform, hideSelectors = false }) => {
    // 根据语言设置默认值和文案
    const getDefaultValues = () => {
        if (language === 'en') {
            return {
                allProducts: 'All',
                allPlatforms: 'All Platforms',
                productLabel: 'Product / Solution:',
                platformLabel: 'Platform / Framework:'
            };
        }
        return {
            allProducts: '全部',
            allPlatforms: '全部平台',
            productLabel: '产品 / 解决方案：',
            platformLabel: '平台 / 框架：'
        };
    };

    const { allProducts, allPlatforms, productLabel, platformLabel } = getDefaultValues();

    const [product, setProduct] = useState(initialProduct || allProducts);
    const [platform, setPlatform] = useState(initialPlatform || allPlatforms);
    const [productOpen, setProductOpen] = useState(false);
    const [platformOpen, setPlatformOpen] = useState(false);
    const productRef = useRef(null);
    const platformRef = useRef(null);

    // 点击外部关闭下拉框
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productRef.current && !productRef.current.contains(event.target)) {
                setProductOpen(false);
            }
            if (platformRef.current && !platformRef.current.contains(event.target)) {
                setPlatformOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdownWrapperStyle = {
        height: '36px',
        background: 'var(--docuo-dropdown-label-bg)',
        borderRadius: '6px',
        border: 'var(--docuo-dropdown-label-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
        marginRight: '10px',
        cursor: 'pointer',
        position: 'relative',
        minWidth: '160px'
    };

    const dropdownWrapperHoverStyle = {
        ...dropdownWrapperStyle,
        background: 'var(--docuo-dropdown-label-bg-hover)'
    };

    const labelStyle = {
        fontSize: '14px',
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: 'var(--docuo-color-primary)',
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    const iconStyle = {
        fontSize: '12px',
        marginLeft: '6px',
        color: 'var(--docuo-dropdown-icon-color)',
        transition: 'transform 0.3s',
        flexShrink: '0'
    };

    const popupStyle = {
        position: 'absolute',
        top: '40px',
        left: '0',
        right: '0',
        zIndex: '1000',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        maxHeight: '258px',
        overflow: 'auto',
        padding: '8px',
        boxShadow: '0px 1px 12px 0px rgba(0, 0, 0, 0.05)',
        borderRadius: '6px',
        border: 'var(--docuo-popup-border)',
        background: 'var(--docuo-popup-bg)'
    };

    const optionStyle = {
        height: '40px',
        flexShrink: '0',
        padding: '6px 8px',
        fontSize: '14px',
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: 'var(--docuo-popup-color)',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    };

    const optionHoverStyle = {
        ...optionStyle,
        background: 'var(--docuo-popup-bg-hover)'
    };

    const activeOptionStyle = {
        ...optionStyle,
        color: 'var(--docuo-color-primary-active)'
    };

    return (
        <FilterContext.Provider value={{ product, platform }}>
            {!hideSelectors && (
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--docuo-color-primary)' }}>{productLabel}</span>
                    <div
                        ref={productRef}
                        style={productOpen ? dropdownWrapperHoverStyle : dropdownWrapperStyle}
                        onClick={() => setProductOpen(!productOpen)}
                        onMouseEnter={(e) => {
                            if (!productOpen) {
                                Object.assign(e.target.style, dropdownWrapperHoverStyle);
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!productOpen) {
                                Object.assign(e.target.style, dropdownWrapperStyle);
                            }
                        }}
                    >
                        <span style={labelStyle}>{product}</span>
                        <span style={{
                            ...iconStyle,
                            transform: productOpen ? 'rotate(-90deg)' : 'rotate(90deg)'
                        }}>▶</span>
                        {productOpen && (
                            <div style={popupStyle}>
                                <div
                                    style={product === allProducts ? activeOptionStyle : optionStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setProduct(allProducts);
                                        setProductOpen(false);
                                    }}
                                    onMouseEnter={(e) => {
                                        if (product !== allProducts) {
                                            Object.assign(e.target.style, optionHoverStyle);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (product !== allProducts) {
                                            Object.assign(e.target.style, optionStyle);
                                        }
                                    }}
                                >
                                    {allProducts}
                                </div>
                                {Object.keys(productData).map(group => (
                                    <div key={group}>
                                        {productData[group].map(item => (
                                            <div
                                                key={item}
                                                style={product === item ? activeOptionStyle : optionStyle}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setProduct(item);
                                                    setProductOpen(false);
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (product !== item) {
                                                        Object.assign(e.target.style, optionHoverStyle);
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (product !== item) {
                                                        Object.assign(e.target.style, optionStyle);
                                                    }
                                                }}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--docuo-color-primary)' }}>{platformLabel}</span>
                    <div
                        ref={platformRef}
                        style={platformOpen ? dropdownWrapperHoverStyle : dropdownWrapperStyle}
                        onClick={() => setPlatformOpen(!platformOpen)}
                        onMouseEnter={(e) => {
                            if (!platformOpen) {
                                Object.assign(e.target.style, dropdownWrapperHoverStyle);
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!platformOpen) {
                                Object.assign(e.target.style, dropdownWrapperStyle);
                            }
                        }}
                    >
                        <span style={labelStyle}>{platform}</span>
                        <span style={{
                            ...iconStyle,
                            transform: platformOpen ? 'rotate(-90deg)' : 'rotate(90deg)'
                        }}>▶</span>
                        {platformOpen && (
                            <div style={popupStyle}>
                                <div
                                    style={platform === allPlatforms ? activeOptionStyle : optionStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPlatform(allPlatforms);
                                        setPlatformOpen(false);
                                    }}
                                    onMouseEnter={(e) => {
                                        if (platform !== allPlatforms) {
                                            Object.assign(e.target.style, optionHoverStyle);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (platform !== allPlatforms) {
                                            Object.assign(e.target.style, optionStyle);
                                        }
                                    }}
                                >
                                    {allPlatforms}
                                </div>
                                {platformData.map(item => (
                                    <div
                                        key={item}
                                        style={platform === item ? activeOptionStyle : optionStyle}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPlatform(item);
                                            setPlatformOpen(false);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (platform !== item) {
                                                Object.assign(e.target.style, optionHoverStyle);
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (platform !== item) {
                                                Object.assign(e.target.style, optionStyle);
                                            }
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
            {children}
        </FilterContext.Provider>
    );
};


const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FaqFilters = ({ children, productData, platformData, language = 'zh', initialProduct, initialPlatform, hideSelectors = false }) => {
    // 根据语言设置默认值和文案
    const getDefaultValues = () => {
        if (language === 'en') {
            return {
                allProducts: 'All',
                allPlatforms: 'All Platforms',
                productLabel: 'Product / Solution:',
                platformLabel: 'Platform / Framework:'
            };
        }
        return {
            allProducts: '全部',
            allPlatforms: '全部平台',
            productLabel: '产品 / 解决方案：',
            platformLabel: '平台 / 框架：'
        };
    };

    const { allProducts, allPlatforms, productLabel, platformLabel } = getDefaultValues();

    const [product, setProduct] = useState(initialProduct || allProducts);
    const [platform, setPlatform] = useState(initialPlatform || allPlatforms);
    const [productOpen, setProductOpen] = useState(false);
    const [platformOpen, setPlatformOpen] = useState(false);
    const productRef = useRef(null);
    const platformRef = useRef(null);

    // 点击外部关闭下拉框
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productRef.current && !productRef.current.contains(event.target)) {
                setProductOpen(false);
            }
            if (platformRef.current && !platformRef.current.contains(event.target)) {
                setPlatformOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdownWrapperStyle = {
        height: '36px',
        background: 'var(--docuo-dropdown-label-bg)',
        borderRadius: '6px',
        border: 'var(--docuo-dropdown-label-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
        marginRight: '10px',
        cursor: 'pointer',
        position: 'relative',
        minWidth: '160px'
    };

    const dropdownWrapperHoverStyle = {
        ...dropdownWrapperStyle,
        background: 'var(--docuo-dropdown-label-bg-hover)'
    };

    const labelStyle = {
        fontSize: '14px',
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: 'var(--docuo-color-primary)',
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    const iconStyle = {
        fontSize: '12px',
        marginLeft: '6px',
        color: 'var(--docuo-dropdown-icon-color)',
        transition: 'transform 0.3s',
        flexShrink: '0'
    };

    const popupStyle = {
        position: 'absolute',
        top: '40px',
        left: '0',
        right: '0',
        zIndex: '1000',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        maxHeight: '258px',
        overflow: 'auto',
        padding: '8px',
        boxShadow: '0px 1px 12px 0px rgba(0, 0, 0, 0.05)',
        borderRadius: '6px',
        border: 'var(--docuo-popup-border)',
        background: 'var(--docuo-popup-bg)'
    };

    const optionStyle = {
        height: '40px',
        flexShrink: '0',
        padding: '6px 8px',
        fontSize: '14px',
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        color: 'var(--docuo-popup-color)',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    };

    const optionHoverStyle = {
        ...optionStyle,
        background: 'var(--docuo-popup-bg-hover)'
    };

    const activeOptionStyle = {
        ...optionStyle,
        color: 'var(--docuo-color-primary-active)'
    };

    return (
        <FilterContext.Provider value={{ product, platform }}>
            {!hideSelectors && (
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--docuo-color-primary)' }}>{productLabel}</span>
                    <div
                        ref={productRef}
                        style={productOpen ? dropdownWrapperHoverStyle : dropdownWrapperStyle}
                        onClick={() => setProductOpen(!productOpen)}
                        onMouseEnter={(e) => {
                            if (!productOpen) {
                                Object.assign(e.target.style, dropdownWrapperHoverStyle);
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!productOpen) {
                                Object.assign(e.target.style, dropdownWrapperStyle);
                            }
                        }}
                    >
                        <span style={labelStyle}>{product}</span>
                        <span style={{
                            ...iconStyle,
                            transform: productOpen ? 'rotate(-90deg)' : 'rotate(90deg)'
                        }}>▶</span>
                        {productOpen && (
                            <div style={popupStyle}>
                                <div
                                    style={product === allProducts ? activeOptionStyle : optionStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setProduct(allProducts);
                                        setProductOpen(false);
                                    }}
                                    onMouseEnter={(e) => {
                                        if (product !== allProducts) {
                                            Object.assign(e.target.style, optionHoverStyle);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (product !== allProducts) {
                                            Object.assign(e.target.style, optionStyle);
                                        }
                                    }}
                                >
                                    {allProducts}
                                </div>
                                {Object.keys(productData).map(group => (
                                    <div key={group}>
                                        {productData[group].map(item => (
                                            <div
                                                key={item}
                                                style={product === item ? activeOptionStyle : optionStyle}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setProduct(item);
                                                    setProductOpen(false);
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (product !== item) {
                                                        Object.assign(e.target.style, optionHoverStyle);
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (product !== item) {
                                                        Object.assign(e.target.style, optionStyle);
                                                    }
                                                }}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--docuo-color-primary)' }}>{platformLabel}</span>
                    <div
                        ref={platformRef}
                        style={platformOpen ? dropdownWrapperHoverStyle : dropdownWrapperStyle}
                        onClick={() => setPlatformOpen(!platformOpen)}
                        onMouseEnter={(e) => {
                            if (!platformOpen) {
                                Object.assign(e.target.style, dropdownWrapperHoverStyle);
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!platformOpen) {
                                Object.assign(e.target.style, dropdownWrapperStyle);
                            }
                        }}
                    >
                        <span style={labelStyle}>{platform}</span>
                        <span style={{
                            ...iconStyle,
                            transform: platformOpen ? 'rotate(-90deg)' : 'rotate(90deg)'
                        }}>▶</span>
                        {platformOpen && (
                            <div style={popupStyle}>
                                <div
                                    style={platform === allPlatforms ? activeOptionStyle : optionStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPlatform(allPlatforms);
                                        setPlatformOpen(false);
                                    }}
                                    onMouseEnter={(e) => {
                                        if (platform !== allPlatforms) {
                                            Object.assign(e.target.style, optionHoverStyle);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (platform !== allPlatforms) {
                                            Object.assign(e.target.style, optionStyle);
                                        }
                                    }}
                                >
                                    {allPlatforms}
                                </div>
                                {platformData.map(item => (
                                    <div
                                        key={item}
                                        style={platform === item ? activeOptionStyle : optionStyle}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPlatform(item);
                                            setPlatformOpen(false);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (platform !== item) {
                                                Object.assign(e.target.style, optionHoverStyle);
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (platform !== item) {
                                                Object.assign(e.target.style, optionStyle);
                                            }
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
            {children}
        </FilterContext.Provider>
    );
};
const FilteredLink = ({ children, href, product, platform, language = 'zh' }) => {
    const { product: selectedProduct, platform: selectedPlatform } = useFilters();

    // 根据语言设置匹配值
    const allProductsValue = language === 'en' ? 'All' : '全部';
    const allPlatformsValue = language === 'en' ? 'All Platforms' : '全部平台';

    const productList = (product || '').split(',').map(p => p.trim()).filter(Boolean);
    const platformList = (platform || '').split(',').map(p => p.trim()).filter(Boolean);

    // 链接端的“全量”通配判断（确保 platform="全平台" 能匹配任意选择的平台）
    const linkProductIsAll = productList.includes(allProductsValue) || productList.includes('全部') || productList.includes('All');
    const linkPlatformIsAll = platformList.includes(allPlatformsValue) || platformList.includes('全平台') || platformList.includes('All Platforms');

    const productMatch = selectedProduct === allProductsValue || linkProductIsAll || productList.includes(selectedProduct);
    const platformMatch = selectedPlatform === allPlatformsValue || linkPlatformIsAll || platformList.includes(selectedPlatform);

    if (productMatch && platformMatch) {
        return (
            <li>
                <a href={href}>{children}</a>
            </li>
        );
    }

    return null;
};

export default FilteredLink;
export const productData = {
    "互动核心产品": [
        "实时音视频",
        "实时语音",
        "超低延迟直播",
        "即时通讯"
    ],
    "互动拓展服务": [
        "超级白板",
        "AI 美颜",
        "云端录制",
        "本地录制",
        "本地服务端录制",
        "小游戏"
    ],
    "UIKits": [
        "音视频通话 UIKit",
        "互动直播 UIKit",
    ],
    "AIGC": [
        "数字人",
        "实时互动 AI Agent",
    ],
    "旧版产品": [
        "文件共享",
        "屏幕共享",
        "互动白板"
    ]
};

export const platformData = [
    "Android",
    "iOS",
    "Windows",
    "macOS",
    "Web",
    "Flutter",
    "ReactNative",
    "Electron",
    "Unity3D",
    "uni-app",
    "小程序",
    "HarmonyOS",
    "Server"
];

<FaqFilters
    productData={productData}
    platformData={platformData}
    language="zh"
    initialProduct={(props && props.product) || undefined}
    initialPlatform={(props && props.platform) || undefined}
    hideSelectors={(props && props.hideSelectors) || false}
>

# 常见问题

{!(props && props.hideSelectors) && <>在这里，您可以查询不同产品、不同平台或框架的常见问题。</>}

## 集成问题
<ul>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Flutter, Unity3D" href="/faq/express-reconnect">
Express SDK 是否支持断线重连机制？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux, Web, Flutter, Electron, ReactNative, uni-app, Unity3D" href="/faq/express-logs-stacktrace">
Express 如何设置和获取 SDK 的日志、堆栈信息？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/video-parameters-selection">
如何选择视频分辨率、帧率、码率？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 互动白板, 文件共享, 本地服务端录制, 屏幕共享, 小程序直播, GO课堂, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux, Flutter, Electron, ReactNative, uni-app, Unity3D" href="/faq/express-token-upgrade">
Express 如何从 AppSign 鉴权升级为 Token 鉴权？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, Flutter" href="/faq/media-vs-call-volume">
媒体音量和通话音量有什么区别？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, macOS" href="/faq/cocoapods-issues">
CocoaPods 常见问题
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Unity3D" href="/faq/audio-device-mode-setting">
如何设置音频设备模式 ZegoAudioDeviceMode？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/room-bombing-prevention">
如何防止音视频互动中的幽灵麦或炸房的现象？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web" href="/faq/audio-monitoring">
如何开启耳返？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 互动白板, 文件共享, AI 美颜, GO课堂, 即时通讯, 超级白板, 超低延迟直播" platform="Android" href="/faq/android-min-sdk-app-size-increase">
设置 Android minSdkVersion 为 23 后，APK 包体积增大了？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, AI 美颜, 即时通讯, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/asan-sdk-usage">
如何使用附带 ASan 工具的 ZEGO SDK？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/reduce-app-size">
如何减少集成 Native SDK 的 App 体积？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="Linux" href="/faq/linux-v4l-utils-cross-compile">
如何交叉编译 Linux v4l-utils 依赖库？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Flutter, Electron, ReactNative, uni-app, Unity3D" href="/faq/device-switching">
如何实现开关摄像头/视频画面/麦克风/音频/扬声器？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/custom-capture-screen-share">
如何通过自定义采集实现屏幕共享？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="iOS, Android" href="/faq/video-capture-rotation">
如何自定义视频采集旋转方式？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS" href="/faq/ios-performance-issues">
在 iOS 应用开发中，出现卡顿、设备发热、内存占用过多等的问题，该如何分析？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/chrome-device-id-issue">
为什么在 Chrome 81 及以上版本浏览器上无法获取设备 ID？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="Linux" href="/faq/alsa-lib-cross-compile_1">
如何交叉编译 Linux alsa-lib 依赖库？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/zim-reconnect-support">
ZIM SDK 是否支持断线重连机制？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, AI 美颜, 即时通讯, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux, Flutter, Electron, ReactNative, uni-app, Unity3D" href="/faq/sdk-package-size">
什么是 SDK 的安装包增量？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android" href="/faq/bluetooth-audio-issue">
为什么 iOS 或 Android 设备连接蓝牙设备后不能通过蓝牙设备通话？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="macOS" href="/faq/mac-system-audio-capture">
Mac 端如何实现系统声卡采集？
</FilteredLink>
<FilteredLink product="实时音视频, 低延迟直播" platform="Web" href="/faq/web-screen-camera-switch">
如何切换屏幕共享流和摄像头视频流？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/file-transcoding-failure-superboard">
为什么有些文件会转码失败？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/audience-room-events">
直播场景下，如何监听远端观众角色用户登录/退出房间的事件？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, 小程序" href="/faq/obs-ios-no-audio">
OBS 推流后，iOS 小程序端拉流没有声音怎么办？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 互动白板, 文件共享, AI 美颜, GO课堂, 即时通讯, 超级白板, 超低延迟直播" platform="iOS" href="/faq/ios-bitcode-compatibility-issue">
打包 iOS 时 Xcode 报错提示 Bitcode 版本不兼容？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="Android" href="/faq/android-api-docs">
Express Android SDK 如何查看 API 注释和文档？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/monitor-mic-camera-status">
如何监听房间内用户的麦克风和摄像头状态？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序" href="/faq/zim-logs">
如何获取 ZIM SDK 的日志信息？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/cloud-storage-params-config">
StorageParams 中的各个云存储相关的参数如何填写？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Android" href="/faq/android-performance-issues">
在 Android 平台开发中，出现 CPU 占用率过高、设备发热的问题该如何分析？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Windows" href="/faq/windows-performance-issues">
在 Windows 应用开发中，出现 CPU 占用高、内存泄漏等的问题，该如何分析？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/remote-user-control">
如何对远端用户进行上下麦/禁言/禁摄像头操作？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/java-token-key-size-error">
运行生成 Token 的 Java 源码时，如果出现 “java.security.InvalidKeyException:illegal Key Size” 异常提示，该如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/mobile-web-sdk-usage">
移动端如何使用 ZEGO Express Web SDK？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS" href="/faq/xcode-12-3-simulator-issue">
在 Xcode 12.3 及以上版本中使用 iOS 模拟器构建项目为什么会失败？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Flutter, ReactNative, uni-app, Unity3D" href="/faq/zim-token-upgrade">
ZIM 如何从 AppSign 鉴权升级为 Token 鉴权？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="小程序" href="/faq/miniprogram-landscape-stream-publish">
小程序推流时，如何设置横屏？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/web-camera-indicator-issue">
为什么在网页端禁用自己的视频后摄像头指示灯还亮着？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android" href="/faq/background-music-volume-issue">
为什么通过系统音量无法调节背景音乐？
</FilteredLink>
<FilteredLink product="屏幕共享" platform="macOS" href="/faq/macos-permissions-issue">
如何解决 macOS 权限问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/audio-3a-configuration">
如何修改音频 3A 处理的配置？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/file-transcoding-failure-superboard">
为什么有些文件会转码失败？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web" href="/faq/token-error-codes">
Express 如何处理 Token 相关错误码？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/web-browser-console-errors">
如何处理常见的 Web 浏览器控制台报错？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-self-messaging">
支持发送消息给自己吗？
</FilteredLink>
<FilteredLink product="实时音视频" platform="Web" href="/faq/web-reconnect">
Web 平台上，Express SDK 是否支持断线重连机制？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-missing">
云录制结束后，没有在云存储中看到录制的文件，该怎么处理？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android" href="/faq/file-transcode-failure">
文件上传或加载失败怎么处理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux, Flutter" href="/faq/audio-dump-handling">
如何获取、上传音频的 Dump 文件？
</FilteredLink>
<FilteredLink product="屏幕共享" platform="macOS" href="/faq/macos-window-capture">
如何解决 macOS 窗口相关问题?
</FilteredLink>
<FilteredLink product="实时音视频" platform="Android, iOS" href="/faq/remote-stream-type">
什么是大小流？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/express-room-maintenance">
客户端集成了 Express SDK，是否需要维护房间？
</FilteredLink>
<FilteredLink product="Roomkit" platform="iOS" href="/faq/ios-metal-crash">
iOS 12 系统真机调试的时候出现 Metal 相关的 crash 怎么解决？
</FilteredLink>
<FilteredLink product="互动白板" platform="Web" href="/faq/whiteboard-fullscreen-display">
浏览器窗口全屏时如何让白板正常显示?
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/ppt-page-turn-failure">
为什么点击动态 PPT 文件页面不能进行翻页？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="全平台" href="/faq/content-rendering-issue">
如何处理白板或文件显示不完整或留白的问题？
</FilteredLink>
<FilteredLink product="屏幕共享" platform="macOS" href="/faq/screen-share-cursor-ghosting">
屏幕共享时，鼠标为什么会有重影（有两个光标显示）?
</FilteredLink>
<FilteredLink product="即时通讯" platform="Android, Flutter" href="/faq/zim-flutter-android-network-issue">
使用 ZIM SDK，在 Flutter 框架下打包 release 版本的 Android apk 包，在真机设备上安装后，无法请求网络，该怎么处理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS" href="/faq/safari-sound-level-lag">
混流时开启音浪功能，使用 Safari 浏览器播放视频出现卡顿现象，如何处理？
</FilteredLink>
<FilteredLink product="实时音视频" platform="Web" href="/faq/web-third-party-stream-black-screen">
使用浏览器推第三方视频流，推流/预览正常，但拉流时画面黑屏，该如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS" href="/faq/express-xcframework-upgrade">
Express 从 2.8.0 之前的版本升级以后，Xcode 编译报错如何处理？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS" href="/faq/xcode-undefined-symbols">
Xcode Archive 时提示 “Undefined symbols for architecture armv7: "_OBJC_CLASS_$_ZegoProduct"”，该如何处理？
</FilteredLink>
<FilteredLink product="实时音视频" platform="uni-app" href="/faq/windows-uniapp-ios-packaging-issue">
在 Windows 平台上集成 Express uni-app SDK 后，使用 dev 证书云打包运行 iOS 应用时出错，该如何处理？
</FilteredLink>
<FilteredLink product="Roomkit" platform="iOS, Android" href="/faq/roomkit-cache-clear">
如何清理缓存？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/kick-user_1">
如何将指定用户移出房间？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="Windows" href="/faq/windows7-window-sharing">
如何处理 Windows 7 窗口共享异常？
</FilteredLink>
<FilteredLink product="屏幕共享" platform="macOS" href="/faq/macos-low-version-crash">
SDK 在 macOS 10.13 及以下的系统版本为什么会崩溃？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/login-error-1002001">
Express SDK 登录房间的时候，为什么会报错：1002001？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="Web" href="/faq/content-sync-issue">
为什么各端看到的白板或者文件内容不同步？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web, Electron" href="/faq/express-sdk-integration-issues">
如何处理集成 Express SDK 时的相关问题？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows, ReactNative" href="/faq/ai-effects-logs">
如何获取 ZegoEffects SDK 的日志信息？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-resolution-setting">
单流和混流的录制分辨率分别在哪里设置？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="iOS, Android" href="/faq/whiteboard-file-loading">
如何通过白板来加载文件？
</FilteredLink>
<FilteredLink product="文件共享" platform="Web" href="/faq/transcoding-clarity-delay">
为什么设置转码清晰度后，没有立马生效，重新渲染也没有生效？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Android, Linux" href="/faq/express-2-20-upgrade-error">
升级 Express v2.20.0 或以上版本后编译报错？
</FilteredLink>
<FilteredLink product="实时音视频" platform="Web" href="/faq/web-resolution-mismatch">
摄像头支持的情况下，预览设置 1920 * 1080，但实际推流只有 640 * 480，该如何处理？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="Web" href="/faq/web-sdk-environment-config">
如何设置 Web 平台互动白板 SDK 和 文件转码 SDK 的环境？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/web-device-switching">
Web 平台上，Express 如何在通话中切换音视频输入设备？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, Windows" href="/faq/stream-removal-time">
双方连麦成功后，如果一方由于关机退出程序（或者杀进程）停止推流，拉流方需多久能收到流删除消息？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/mirror-mode-setting">
Express 如何设置镜像模式？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享, GO课堂" platform="iOS, Android, Web" href="/faq/github-source-error">
从 GitHub 下载源码后直接运行为什么会报错？
</FilteredLink>
<FilteredLink product="Roomkit" platform="Web" href="/faq/roomkit-exit-redirect-issue">
在房间内点击离开课堂后页面未跳转怎么处理？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/single-stream-recording-stream-type-issue">
在单流录制过程中，为什么白板文件设置的 StreamType 不生效？
</FilteredLink>
<FilteredLink product="实时音视频, 互动白板, 超低延迟直播" platform="iOS, Android" href="/faq/whiteboard-rtc-integration">
如何搭配使用互动白板 SDK 和 实时音视频 SDK？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-device-detection-error">
Web 平台创建流时出现 “devices detect error: NotReadableError Could not start video source” 错误？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/server-api-auth">
如何在服务端 API 中进行鉴权认证?
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-autoplay-implementation">
Web 端如何实现自动播放？
</FilteredLink>
<FilteredLink product="Roomkit" platform="iOS" href="/faq/roomkit-bitcode-error">
集成 RoomKit iOS SDK 打包时报错：“Failed to verify bitcode in xxx.framework/xxx” 如何处理？
</FilteredLink>
<FilteredLink product="屏幕共享" platform="macOS" href="/faq/qt-windows-enum-mapping">
Qt 的枚举窗口和 SDK 内的窗口枚举有什么对应关系？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="Electron" href="/faq/macos-monterey-device-access-issue">
macOS Monterey(12.2.1) 及以上版本运行 electron 应用导致摄像头等设备不能使用或者 crash？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/font-rendering-inconsistency">
为什么有些文件转码后的字体在多端显示会不一致？
</FilteredLink>
<FilteredLink product="文件共享, 超级白板" platform="全平台" href="/faq/superboard-upload-failure">
超级白板上传文件失败怎么处理？
</FilteredLink>
<FilteredLink product="Roomkit" platform="Web" href="/faq/h5-teacher-video-missing">
Web 端大班课，H5 端看不到教师的画面如何处理？
</FilteredLink>
<FilteredLink product="超级白板" platform="Web" href="/faq/windows-ink-support-issue">
为什么 Web 平台在 Windows 设备上使用手写板时无法在白板上进行绘制？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/max-concurrent-streams">
一个用户最多支持同时拉取几条流 ？
</FilteredLink>
<FilteredLink product="互动白板" platform="Web" href="/faq/web-whiteboard-login-failure">
如何解决 Web 平台互动白板 SDK 登录失败的问题？
</FilteredLink>
<FilteredLink product="屏幕共享" platform="macOS" href="/faq/capture-area-failure">
为什么区域采集设置失效？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, Windows" href="/faq/zim-stacktrace">
如何获取 ZIM SDK 的堆栈信息？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="iOS, Android, Web" href="/faq/whiteboard-page-turn-issue">
白板创建成功后，调用翻页接口不生效？
</FilteredLink>
<FilteredLink product="实时音视频" platform="uni-app" href="/faq/uni-app-no-video-display">
在 uni-app 平台上，本地预览、拉流，均无画面显示，该如何处理？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/custom-layout-failure">
为什么指定了 StreamId，但自定义布局不生效？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/exclude-whiteboard-recording">
录制过程中，房间内的白板不需要录制了，要如何操作？
</FilteredLink>
<FilteredLink product="Roomkit" platform="iOS" href="/faq/ios-simulator-build-error">
运行 App 时提示：“Building for iOS Simulator...” 如何处理？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-hotkeys">
超级白板 SDK 是否支持快捷键操作？
</FilteredLink>
<FilteredLink product="超级白板" platform="iOS, Android" href="/faq/superboard-logging-config">
如何设置超级白板日志？
</FilteredLink>
<FilteredLink product="实时音视频, 低延迟直播, 超低延迟直播" platform="iOS, Android, uni-app" href="/faq/camera-focal-length-adjustment">
如何调节摄像头的焦距（变焦功能）？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/express-stream-play-web-cdn">
Web 平台如何实现从 CDN 拉流？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android" href="/faq/file-sharing-sdk-failure">
如何处理文件共享 SDK 所有接口均异常的问题？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/stream-mix-viewtype-2-config">
混流的 MixInputList 参数，如果 ViewType 设为 2，StreamId 需要如何设置？
</FilteredLink>
<FilteredLink product="Roomkit" platform="Android" href="/faq/ndk-version-error">
编译 Roomkit 源码时，遇到 "No version of NDK..." 错误如何处理?
</FilteredLink>
<FilteredLink product="互动白板" platform="iOS, Android" href="/faq/whiteboard-prerequisites">
使用互动白板前需要做些什么？
</FilteredLink>
<FilteredLink product="超级白板" platform="Web" href="/faq/superboard-fullscreen-display">
浏览器窗口全屏时如何让白板正常显示?
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="Web" href="/faq/token-compatibility">
文件共享 SDK 的 token 是否和互动白板 SDK 的 token 通用？
</FilteredLink>
<FilteredLink product="实时音视频, 超级白板, 超低延迟直播" platform="全平台" href="/faq/superboard-express-integration">
如何搭配使用 超级白板 SDK 和 实时音视频 SDK？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux, Flutter, Electron, ReactNative, uni-app, Unity3D, HarmonyOS" href="/faq/room-switch-error">
使用 “switchRoom” 切换房间的时候，为什么报错：1000002-没有登录房间？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/cross-platform-id-restrictions">
Express 各平台 SDK 互通时，userID/roomID/streamID 是否有什么限制？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, ReactNative" href="/faq/ai-effects-stacktrace">
如何获取 ZegoEffects SDK 的堆栈信息？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-cdn-stream-url">
Web 平台如何获取 CDN 的拉流地址？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="全平台" href="/faq/ppt-navigation-failure">
在加载动态 PPT 文件后，点击动态 PPT 无法翻页，该如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="Web" href="/faq/web-stream-screenshot">
Web 平台如何实现对预览、拉流画面进行截图？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-create-stream-no-video">
Web 平台通过 “createStream” 方法创建了流，并已给 video 对象的 “srcObject” 赋值，为什么 video 对象没有画面？
</FilteredLink>
<FilteredLink product="Roomkit" platform="iOS, Android" href="/faq/roomkit-logs">
如何获取 Roomkit SDK 日志？
</FilteredLink>
<FilteredLink product="屏幕共享" platform="macOS" href="/faq/screen-capture-error-3">
开始进行屏幕分享报错 “onScreenCaptureError 3” 怎么处理？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/whiteboard-tools">
如何添加白板工具？
</FilteredLink>
<FilteredLink product="Roomkit" platform="Web" href="/faq/roomkit-cdn-configuration">
Web 平台上，RoomKit 大班课，作为学生加入时看不到教师的画面如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="Web" href="/faq/cdn-flv-latency-accumulation">
Web 平台从 CDN 拉流，使用 flv 格式播放，为什么暂停后、再播放会导致延迟累积呢？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux" href="/faq/zego-scenario-enable-camera-config">
调用 createEngine 接口创建引擎时，如果将房间场景设置为 “语音通话/语聊房/KTV” 等场景时，还需要主动调用 “enableCamera” 接口关闭摄像头吗？
</FilteredLink>
<FilteredLink product="超级白板" platform="Web" href="/faq/transcoding-clarity-delay">
为什么设置转码清晰度后，没有立马生效，重新渲染也没有生效？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-publish-device-error">
Web 端推流时，报错：“code: 1103065, msg: Not Readable Error: device is not readable”，该如何处理？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="iOS, Android" href="/faq/file-whiteboard-logging">
如何设置文件/白板的日志？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-total-failure">
如何处理超级白板 SDK 所有接口均异常的问题？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="Web" href="/faq/web-resolution-display-difference">
Web 平台上，当设置的视频分辨率“宽”大于“高”时，PC 端和移动端分别怎么展示？
</FilteredLink>
<FilteredLink product="实时音视频" platform="Web" href="/faq/web-mirror-mode-setting">
Web 平台，Express 如何设置镜像模式？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/express-im-callback-missing">
Express SDK 发送实时消息后，为什么收不到回调？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="iOS" href="/faq/background-camera-limitation">
为什么应用在后台时，不支持打开摄像头？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享, 超级白板" platform="全平台" href="/faq/ppt-animation-click-issue">
动态 PPT 内的动画点击无反应，该如何处理？
</FilteredLink>
<FilteredLink product="即时通讯" platform="全平台" href="/faq/zim-heartbeat-timeout">
ZIM 默认多长时间发送一次心跳？超过多长时间没有收到用户心跳时，后台会判断为超时？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/cdn-relay-disconnect-handling">
Web 平台将流转推到 CDN 过程中，连接断开后如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/reduce-console-logs">
如何减少 Express SDK 在 Web 控制台打印的信息？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/logout-stream-management">
Express SDK 退出房间，是否需要主动停止推拉流？
</FilteredLink>
<FilteredLink product="互动白板" platform="Web" href="/faq/windows-ink-support-issue">
为什么 Web 平台在 Windows 设备上使用手写板时无法在白板上进行绘制？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, Electron, ReactNative, Unity3D" href="/faq/zim-callbacks">
ZIM SDK 中的 onConnectionStateChanged 回调与 onRoomStateChanged 回调的区别是什么？分别在什么情况下触发？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-https-requirement">
Web 平台报错 “https or localhost required”，是否必须要求 “https”？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-preview-audio-noise">
Web 平台只预览推流，没有拉流时存在杂音/啸叫声，如何处理？
</FilteredLink>
<FilteredLink product="实时音视频" platform="全平台" href="/faq/media-audio-mixing">
如何将媒体播放器播放文件的声音混入推流中？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web" href="/faq/stream-control-priority">
推流时，调用 “enableTrafficControl” 方法开启流控后，网络质量比较差时，为什么仅主路流会触发流控策略？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="Android" href="/faq/firebase-integration-conflict-resolution">
如何解决同时集成 Firebase Cloud Message 时的冲突？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/mic-disable-comparison">
使用 “muteMicrophone”、“enableAudioCaptureDevice” 接口时，将参数设置为 false，两者有什么区别？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-screen-sharing-audio-capture">
Web 平台屏幕分享，如何将系统声音和麦克风声音分享出去？
</FilteredLink>
<FilteredLink product="Roomkit" platform="Web" href="/faq/roomkit-compile-error">
调用编译打包后 Roomkit SDK 的接口时报错怎么处理？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/file-load-error-60018">
文件转码加载文件失败，返回 60018 错误码是什么原因？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-play-no-audio">
Web 平台 “playQualityUpdate” 中有音频码率，但拉流成功后有画面没有声音，是什么原因？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web" href="/faq/flv-sound-level-black-screen">
混流时开启了音浪功能，使用 “flv.js” 拉流播放在部分浏览器上会黑屏？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-https-flv-compatibility">
Web 平台使用 “https” 上线，但 SDK 返回的 flv 拉流地址是 “http” 的，无法兼容，如何解决？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-pure-audio-stream">
Web 平台如何推纯音频的流？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, Windows" href="/faq/room-switch-rendering-optimization">
在需频繁切换房间的场景，拉流端画面渲染的速度比较慢，如何进行优化？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/stream-mix-id-sharing">
不同用户之间如何传递混流流名信息？
</FilteredLink>
<FilteredLink product="即时通讯" platform="全平台" href="/faq/zim-online-status-error">
通过 ZIM 服务端 “查询用户在线状态” 接口返回 660200001 错误码，该如何处理？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, Flutter, ReactNative" href="/faq/push-id-retrieval">
如何获取离线推送 PushID？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-create-stream-empty-input">
Web 平台调用 createStream 方法创建流，参数 “audioInput” 和 “videoInput” 可以传空串吗？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-stream-source-error">
Web 平台 SDK 推流报错 “stream not from zego”，该如何处理？
</FilteredLink>
<FilteredLink product="实时音视频" platform="Web, uni-app" href="/faq/uniapp-stream-rendering-issue">
使用 “uni-app” 框架，拉流的时候 “playerStateUpdate” 显示拉流成功，但是使用 “srcObject” 无法渲染出画面？
</FilteredLink>
<FilteredLink product="实时音视频" platform="Web" href="/faq/web-screen-share-callback">
在 Web 平台上，进行屏幕分享过程中，点击 “停止共享”按钮，会有回调信息吗？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享, 超级白板" platform="全平台" href="/faq/ppt-animation-discrepancy">
动态 PPT 转码完成后部分动画与源文件有差异，该如何处理？
</FilteredLink>
<FilteredLink product="云端录制, 本地服务端录制" platform="全平台" href="/faq/recording-callback-duplicate">
为什么“后台回调-录制文件生成回调”会回调两次? 并且两次回调的视频内容都是一样的？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/express-im-history-messages">
使用实时音视频（ZEGO Express SDK）的“实时消息与信令”功能，是否支持查询历史消息？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="小程序" href="/faq/miniprogram-device-state-monitoring">
使用 Express SDK，小程序作为推流端时，拉流端如何获取麦克风、摄像头的状态变化？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="Web" href="/faq/web-stream-mirror-setting">
Web 平台如何设置预览和拉流的镜像？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="小程序" href="/faq/miniprogram-cdn-push">
小程序如何直推 CDN？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows" href="/faq/ai-effects-auth-failure">
客户端在线鉴权，通过 URL 地址访问 ZegoEffects 服务端时，为什么有时会出现失败？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/express-token-auth-methods">
Express SDK 有哪些 Token 鉴权方式，该如何使用？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/cdn-recording-merge">
使用 CDN 录制时，当推流端出现断流的情况下，会生成多个录制文件，如何将这些录制文件进行合并呢？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web" href="/faq/external-capture-png-support">
使用外部采集时，是否支持推送携带透明通道的 PNG 图片？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-device-permission-block">
在 Web 平台上，如何禁止麦克风/摄像头的访问权限弹框？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-player-exists-error">
Web 平台拉流时候报错：“Player already exist！” 是什么原因？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux, Flutter, Electron, ReactNative, uni-app, Unity3D, HarmonyOS" href="/faq/console-log-output">
Express SDK 如何将 SDK 日志打印到控制台？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-login-token-error">
Web 平台登录房间时提示报错：“cmd=login, err_code=1011, err_message=token format error”？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/record-by-stream-id">
如何指定 StreamID 进行云端录制？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows" href="/faq/ai-stickers-implementation">
AI 美颜如何实现挂件功能？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows, ReactNative" href="/faq/ai-effects-license-error">
使用 ZegoEffects 时，如何解决服务端错误“No valid license”（无法拿到证书）？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web" href="/faq/express-stream-publish-encryption-key">
Express 推流是否支持设置密钥，需要使用对应密钥才能拉流？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-login-error-1000000101">
Web 平台登录房间报错："content":"cmd=login, err_code=1000000101, err_message=login liveroom request fail", 或者 "content":"server error=1000000101"，原因是什么？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/file-load-error-2030004">
文件转码加载文件失败，返回 2030004 错误码是什么原因？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享, 超级白板" platform="全平台" href="/faq/ppt-text-loss">
PPT 转码完成后会出现文字丢失，该如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/cdn-publish-disable-requirement">
调用 “enablePublishDirectToCDN” 直推 CDN，停止推流后，是否需要再将 “enablePublishDirectToCDN” 重新设置成 “false”？
</FilteredLink>
<FilteredLink product="即时通讯" platform="全平台" href="/faq/zim-how-to-query-modified-info">
用户通过 ZIM SDK 接口，修改自己的名称、头像、个人信息扩展字段后，如何查询修改后的信息？
</FilteredLink>
<FilteredLink product="互动白板" platform="Windows" href="/faq/windows-modal-overlay-issue">
当 Windows 端的白板遮挡住用户的模态对话框后，用户的程序无法点击时该如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Unity3D" href="/faq/unity-shader-rendering">
Unity SDK 将图像渲染到网格上时，为什么 shader 选择 “Universal Render Pipeline > Lit” 可以渲染成功，选择 “Universal Render Pipeline > Unlit” 则无法渲染？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows, Flutter, ReactNative" href="/faq/ai-filter-no-effect">
为什么美颜设置滤镜后，看不出效果？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="Android" href="/faq/log-retrieval">
如何获取日志文件？
</FilteredLink>
<FilteredLink product="互动白板" platform="Android" href="/faq/android-whiteboard-sdk-init-error">
Android 平台下初始化白板 SDK 时报错：Didn't find class "com.zego.edu.logger.ZegoEduLogger"？
</FilteredLink>
<FilteredLink product="即时通讯" platform="全平台" href="/faq/zim-groupid-reuse">
使用 ZIM SDK 时，解散了群组，还能用这个群组的 GroupID 重新创建群组吗？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/express-server-room-api">
Express 的服务端有创建房间的 API 吗？
</FilteredLink>
<FilteredLink product="即时通讯" platform="全平台" href="/faq/zim-offline-messages">
ZIM SDK 为什么没办法查到房间的离线消息？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/callback-ordering">
服务端的“流创建”和“流关闭”回调通知，能否保证是有序的？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/empty-room-destruction">
房间没人时，房间会立即销毁吗？
</FilteredLink>
<FilteredLink product="即时通讯" platform="uni-app" href="/faq/zim-upgrade-base-requirement">
更新 ZIM SDK 版本后，需要重新打基座吗?
</FilteredLink>
<FilteredLink product="文件共享, 超级白板" platform="Android" href="/faq/duplicate-file-id">
多次上传文件时，为什么会返回相同的 fileID？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/duplicate-user-id-issue">
使用 Express SDK 时，如果不同的客户端使用同一个userID 登录房间，会出现什么问题？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows" href="/faq/zego-effects-crash">
如何处理调用 ZegoEffects SDK 接口导致崩溃的问题？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="Android" href="/faq/custom-back-button-event">
如何自定义通话中的返回按钮事件？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows" href="/faq/ai-face-edge-artifacts">
启用瘦脸效果后，当屏幕上用户人脸靠近边缘会导致四周有黑块，应该如何处理？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows, ReactNative" href="/faq/ai-effects-license-no-effect">
如何处理拿到证书但美颜没效果？
</FilteredLink>
<FilteredLink product="互动直播 UIKit" platform="Android" href="/faq/stream-mute-unmute">
如何暂停/恢复接收房间内的流？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows" href="/faq/rtc-preprocess-black-screen">
在 RTC 的自定义前处理功能中使用 ZegoEffects 功能时，预览和推流出现黑屏，如何处理？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="Android" href="/faq/disable-call-toast">
如何禁用 callInviteButton 的 toast 显示？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="全平台" href="/faq/audio-only-scenario-support">
使用实时音视频的 SDK，可以实现纯语音通话场景吗？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows" href="/faq/ai-effects-server-access-failure">
客户端在线鉴权时，如何处理通过 URL 地址访问 ZegoEffects 服务端失败？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS, Android, macOS, Windows" href="/faq/process-image-black-screen">
如何处理调用 processImageBuffer 后导致的黑屏？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/create-room">
Express 如何创建房间？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/font-rendering-error">
动态转码出现某些字体错位，或大小不一致的情况，如何处理？
</FilteredLink>
<FilteredLink product="实时音视频, 即时通讯, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/zim-vs-rtc-login">
ZIM 的 login 接口和实时音视频 loginRoom 接口有何差异？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="iOS" href="/faq/floating-video-trigger">
何时会显示悬浮窗视频？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="iOS" href="/faq/sdk-integration-errors">
如何处理接入错误？
</FilteredLink>
</ul>

## 质量问题
<ul>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, Web" href="/faq/camera-access-failure">
为什么我无法打开摄像头？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, ReactNative" href="/faq/video-zoom-or-black-bars-issue">
怎么处理视频放大或黑边问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/web-live-failure">
如何处理 Web 平台直播过程中出现黑屏或无声？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Unity3D" href="/faq/audio-echo-issue">
怎么处理音频回声问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/av-sync-issue">
怎么处理音画不同步问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/audio-level-consistency">
如何避免直播上下麦时音量的变化？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/flow-control-in-weak-network">
如何在较差的网络环境中保证音视频流畅（流控）？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Flutter, Unity3D" href="/faq/low-audio-volume-issue">
怎么处理音量太小问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Flutter" href="/faq/audio-stutter">
Express 怎么处理音频卡顿问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, ReactNative" href="/faq/video-blur-issue">
怎么处理视频模糊问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Flutter" href="/faq/video-freeze-issue">
Express 怎么处理视频卡顿问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Unity3D" href="/faq/audio-noise-issue">
怎么处理音频噪声问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Flutter, Unity3D" href="/faq/no-audio-issue">
怎么处理无声问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播" platform="Web" href="/faq/web-screen-sharing-quality">
如何解决 Web 平台屏幕共享的质量问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web" href="/faq/cross-platform-video-issues">
如何解决 Web 平台和 Native 平台互通时出现的画面异常问题（如黑屏、绿屏、花屏等）？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/video-black-screen">
Express 怎么处理视频黑屏问题？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-missing-whiteboard">
为什么启动录制后，录制任务成功，但是录制结果的视频中没有显示白板？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 互动白板, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/video-artifacts">
怎么处理视频花屏或绿屏问题？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-rendering-issue">
如何处理白板显示不完整或留白的问题？
</FilteredLink>
<FilteredLink product="AI 美颜" platform="iOS" href="/faq/ai-whitening-discoloration">
开启美白后画面整体变黑或者偏蓝，该如何处理？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/whiteboard-background-display-issue">
为什么白板的窗口位置会显示背景图？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-whiteboard-size-issue">
为什么录制结果中，白板的窗口变小，出现异常？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/whiteboard-stream-overlay-issue">
为什么白板的窗口位置会显示音视频流？
</FilteredLink>
<FilteredLink product="文件共享, 超级白板" platform="全平台" href="/faq/file-transcoding-slow">
为什么有时文件转码需要很久？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-font-issue">
文件白板中显示的字体异常怎么处理？
</FilteredLink>
</ul>

## 产品咨询
<ul>
<FilteredLink product="数字人 PaaS 服务" platform="全平台" href="/faq/avatar-metaworld-alternatives">
Avatar、MetaWorld 产品及相关解决方案，下架后的替代方案是什么？
</FilteredLink>
<FilteredLink product="音视频通话 UIKit" platform="iOS, Android" href="/faq/roomkit-go-class-alternatives">
RoomKit、Go 课堂产品及其相关解决方案，下架后的替代方案是什么？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/data-stream-recording-alternatives">
数据流录制产品及其相关解决方案，下架后的替代方案是什么？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 互动白板, 文件共享, AI 美颜, 云端录制, 本地服务端录制, 屏幕共享, 小程序直播, GO课堂, 即时通讯, 超级白板, 超低延迟直播, 实时传译" platform="全平台" href="/faq/zego-solutions">
ZEGO 提供哪些解决方案？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="Web" href="/faq/web-sdk-browser-support_1">
ZEGO Express Web SDK 支持哪些浏览器？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享, 超级白板" platform="全平台" href="/faq/superboard-whiteboard-file-sharing-relation">
超级白板和互动白板和文件共享是什么关系？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/ultra-low-latency-vs-cdn">
ZEGO 超低延迟直播和其他 RTMP + CDN 直播技术有什么区别？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/token-guide">
什么是 Token？如何生成 Token？如何使用 Token？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/ppt-audio-control-issue">
为什么 PPT 内嵌的音频文件，无法暂停和拖动进度条？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-global-access">
即时通信 IM 支持海外接入吗？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-rejoin-behavior">
在录制过程中，如果音视频流退出房间再重进，会是什么表现？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/sdk-platform-version-support">
ZEGO 云通讯 SDK 支持哪些平台，各平台对系统版本的要求是什么？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-custom-graphics">
什么是自定义图形？
</FilteredLink>
<FilteredLink product="小游戏平台" platform="iOS, Android, Web" href="/faq/how-to-access-mini-game-docs">
普通小游戏（休闲类游戏、棋牌类游戏）相关文档已下架，如何获取相关内容？
</FilteredLink>
<FilteredLink product="实时音视频, 即时通讯, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-rtc-integration">
ZIM 房间内是否包含实时音视频流？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/60fps-stream-support">
ZEGO Express SDK 是否支持拉 60 帧的流？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-new-stream">
开始录制后，如果房间内新增了流，这个新增的流会被录制吗？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/im-recording">
支持录制 IM 信息吗？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/cloud-recording-failure-handling">
云端录制服务器出现断网、异常崩溃时，会如何处理？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-file-limits">
超级白板 SDK 支持的文件是否有大小、格式限制？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="全平台" href="/faq/audio-processing-features">
ZEGO 的音频处理有哪些特点？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/ppt-notes-hiding">
录制 PPT 时，能隐藏 PPT Notes 吗？
</FilteredLink>
<FilteredLink product="互动白板" platform="Web" href="/faq/whiteboard-hotkeys">
互动白板 SDK 是否支持快捷键操作？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/mix-stream-recording-ppt-specification">
混流录制指定画面我们可以指定老师端或学生端的共享 PPT 吗？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/crash-impact-recording">
用户程序崩溃对云录制会有什么影响？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-layout-board-position">
自定义布局、水平布局、平分布局、垂直布局、悬浮布局都支持指定白板的位置吗？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/single-layout-multi-stream-recording">
混流录制自定义布局下，如果 mix_input_list 只有一个布局，可以录制多条流么？
</FilteredLink>
<FilteredLink product="互动白板" platform="全平台" href="/faq/whiteboard-lifecycle">
互动白板的生命周期是什么样的？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/storage-temp-token">
第三方云存储参数（StorageParams）支持传入临时授权的 Token 吗？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/dynamic-ppt-recording">
支持录制动态 PPT 吗？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/supported-file-formats">
文件转码支持哪些格式？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/multiple-boards-recording">
录制视频里可以同时展示两个白板窗口么？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/delayed-whiteboard-recording">
当开启了白板录制，但房间内过了一段时间才新增白板，白板如何录制？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/file-transcoding-flow-calculation">
文件上传转码和下载观看耗费的流量如何计算？
</FilteredLink>
<FilteredLink product="互动白板, 文件共享" platform="全平台" href="/faq/whiteboard-file-sdk-relation">
互动白板 SDK 与 文件共享 SDK 的关系是什么？
</FilteredLink>
<FilteredLink product="文件共享, 超级白板" platform="Web" href="/faq/ppt-right-click-menu-issue">
为什么在转码后的动态 PPT 文件页面上点击鼠标右键不会弹出菜单？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-lifecycle_1">
超级白板的生命周期是什么样的？
</FilteredLink>
<FilteredLink product="Roomkit" platform="全平台" href="/faq/roomkit-scenarios">
RoomKit 创建项目时要选择的各个使用场景有什么区别？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-limit">
一个房间内最多可创建多少个白板？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, AI 美颜, 即时通讯, 超级白板, 超低延迟直播" platform="全平台" href="/faq/sdk-version-retrieval">
如何获取 SDK 的版本号？
</FilteredLink>
<FilteredLink product="文件共享" platform="全平台" href="/faq/file-sharing-limits">
文件共享 SDK 支持的文件是否有大小、格式限制？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-av-support">
超级白板是否支持音视频文件共享？
</FilteredLink>
<FilteredLink product="超级白板" platform="全平台" href="/faq/superboard-roles">
超级白板是否区分老师、学生等角色？
</FilteredLink>
<FilteredLink product="互动白板" platform="iOS, Android, Web" href="/faq/superboard-custom-graphics">
什么是自定义图形？
</FilteredLink>
<FilteredLink product="互动白板" platform="iOS, Android, Web" href="/faq/whiteboard-roles">
互动白板是否区分老师、学生等角色？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/call-insights-obs-integration">
使用 OBS、小程序平台推流时，能否在 “星图 > 通话洞察” 中查到推拉流记录？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 互动白板, 文件共享, AI 美颜, 云端录制, 本地服务端录制, 屏幕共享, 即时通讯, 超级白板, 超低延迟直播" platform="全平台" href="/faq/domain-cname-configuration">
如何配置域名 CNAME？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 即时通讯, 超低延迟直播" platform="全平台" href="/faq/multi-room-leave-sequence">
如果用户同时在实时音视频和即时通讯的房间里，需要离开房间时，应该先调用 Express SDK 的 “logoutRoom” 接口，还是 ZIM SDK 的 “leaveRoom” 接口呢？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-sdk-browser-support">
Express Web SDK 支持哪些浏览器？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-room-quota">
ZIM 体验版套餐内，默认同一个 AppID 下最多可创建 20 个房间，如果创建 5 个后再销毁 5 个，此时还能再创建几个？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 互动白板, 文件共享, AI 美颜, 云端录制, 本地服务端录制, 屏幕共享, 即时通讯, 超级白板, 超低延迟直播" platform="全平台" href="/faq/domain-ownership-verification">
如何进行域名归属权认证？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-callback-timing">
云端录制什么时候会收到回调通知？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/file-size-limits">
文件是否有大小限制？
</FilteredLink>
<FilteredLink product="即时通讯" platform="Android, Flutter, ReactNative" href="/faq/zim-google-push-china">
ZIM 的 Google 离线推送是否可以用在国内环境？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/file-transcoding-timeout-duration">
文件转码加载文件的超时时间是多久？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/room-admin-presence">
在每个房间，通话中是否有管理员？
</FilteredLink>
<FilteredLink product="文件共享" platform="iOS, Android, Web" href="/faq/av-file-transcoding">
文件转码是否支持音视频文件共享？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/multi-room-configuration">
多房间功能是否需要特殊配置？
</FilteredLink>
<FilteredLink product="Roomkit" platform="全平台" href="/faq/roomkit-h5-support">
RoomKit 小班课场景中，学生端是否支持 H5?
</FilteredLink>
<FilteredLink product="互动白板" platform="iOS, Android, Web" href="/faq/whiteboard-tools">
如何添加白板工具？
</FilteredLink>
<FilteredLink product="即时通讯" platform="Flutter" href="/faq/zim-flutter-send-message-error-code">
ZIM Flutter `sendMessage` 接口的 `ZIMMessageSentCallback` 中没有暴露 `errorcode`，该如何获取呢？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/message-receipt-issue">
使用消息回执功能把消息设置为已读，为什么会话列表中消息未读数没有减少呢？
</FilteredLink>
<FilteredLink product="小游戏" platform="Android, iOS, Web" href="/faq/mini-game-alternatives">
小游戏平台下架后的替代方案是什么？
</FilteredLink>
</ul>

## 其他问题
<ul>
<FilteredLink product="实时音视频, 实时语音, 互动白板, 文件共享, AI 美颜, 云端录制, 本地服务端录制, 屏幕共享, 即时通讯, 超级白板, 超低延迟直播" platform="全平台" href="/real-time-video-macos-swift/call-server-api-online">
如何在线调试服务端 API？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows, Web, Flutter" href="/faq/media-sei-usage">
如何理解和使用 SEI（媒体补充增强信息）？
</FilteredLink>
<FilteredLink product="实时音视频" platform="Web" href="/faq/webrtc-known-issues">
WebRTC 浏览器的一些已知问题及规避方案？
</FilteredLink>
<FilteredLink product="实时音视频, 超低延迟直播" platform="iOS, Android, Windows" href="/faq/obs-stream-sync-issue">
如何处理使用 OBS 推流，SDK 拉流时出现画面卡顿或音画不同步的问题？
</FilteredLink>
<FilteredLink product="即时通讯" platform="macOS" href="/faq/macos-app-nap-issue">
如何处理 macOS 系统上 App Nap（App 小憩）的问题？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 互动白板, 文件共享, AI 美颜, 云端录制, 本地服务端录制, 屏幕共享, 小程序直播, GO课堂, 即时通讯, 超级白板, 超低延迟直播" platform="iOS, Android, macOS, Windows, Linux" href="/faq/bitmask-usage">
如何使用位掩码？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="iOS, Android, macOS, Windows" href="/faq/vad-interface-selection">
如何根据场景选择语音检测的不同接口？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/stream-id-naming">
如何定义 streamID 比较合适？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-custom-messages">
什么时候使用自定义消息？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-friend-only-messaging">
如何限制只有好友之间才能互发消息？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 低延迟直播, 超低延迟直播" platform="Android" href="/faq/android-background-capture-issue">
为什么 Android 9 应用锁屏或切后台后采集音视频无效？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/stream-muting">
拉流时如何静音某条流或者全部流？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-room-destruction">
IM 如何销毁房间？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/im-message-priority-setting">
如何设置消息的优先级更为合理？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-https-requirement_1">
在 Web 平台上部署服务器时，必须使用 HTTPS 协议吗？
</FilteredLink>
<FilteredLink product="即时通讯" platform="iOS, Android, macOS, Windows, Web, 小程序, Flutter, ReactNative, uni-app, Unity3D" href="/faq/multi-room-join">
一个用户是否可以加入多个房间？
</FilteredLink>
<FilteredLink product="Roomkit" platform="Android" href="/faq/roomkit-rejoin-failure">
在房间里时，按Home键回到桌面后，点击应用图标回到应用，为什么没有回到房间？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/express-callback-ssl-config">
“后台回调-流创建回调”里面的 “pic_url” 可用于鉴黄，“pic_url” 能否配置 ssl？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/network-failure-auto-exit">
网络环境差时，Express SDK 会强行让用户自动退出房间吗？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音" platform="Web" href="/faq/wechat-ios-stream-issue">
推流正常时，只有 Android 平台能使用微信浏览器正常拉流，iOS 平台无法拉流，但 “playQualityUpdate” 回调中有数据？
</FilteredLink>
<FilteredLink product="实时音视频, 屏幕共享, 超低延迟直播" platform="iOS" href="/faq/ios-screen-sharing-crash">
iOS 设备屏幕分享时系统崩溃是什么原因？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/active-speaker-detection">
Express SDK 如何监听房间内谁在说话？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="Web" href="/faq/web-audio-only-permission">
Web 平台推流时，如何只提供音频权限？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/stream-mix-auto-stop">
两条流混流时，若其中一条流断开了，混流是否会自动停止？
</FilteredLink>
<FilteredLink product="实时音视频" platform="全平台" href="/faq/low-end-device-optimization">
对配置较低的机型设备，如何选择采集配置、编码分辨率，才能降低性能开销？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/kick-nonexistent-user-error">
调用 “房间用户踢出接口”，踢出一个不存在的用户，是否会报错？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/stream-mix-seq">
使用服务端混流 API，开始混流接口中的 “seq” 值有什么作用？
</FilteredLink>
<FilteredLink product="云端录制" platform="全平台" href="/faq/recording-user-count-mismatch">
使用云端录制时，房间内只有两个真实用户，但 onRoomOnlineUserCountUpdate 回调却显示有三个用户？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/audio-mix-background-config">
在纯音频场景下，混流想要显示背景图，该如何操作？
</FilteredLink>
<FilteredLink product="互动白板, 超级白板" platform="全平台" href="/faq/whiteboard-trail-eraser">
白板是否支持按轨迹擦除内容？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/callback-form-data-issue">
后台流创建与流关闭回调返回的数据，为什么使用 “Form” 格式处理时无效？
</FilteredLink>
<FilteredLink product="实时音视频, 实时语音, 超低延迟直播" platform="全平台" href="/faq/ssl-wildcard-certificate-mismatch">
使用泛域名申请了 SSL 证书，为什么在控制台上传证书时，提示当前上传的证书与域名不匹配？
</FilteredLink>
</ul>

</FaqFilters>
<Content product="实时音视频" platform="macOS" hideSelectors={true} />