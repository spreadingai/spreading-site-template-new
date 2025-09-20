/**
 * 生成浏览器指纹，用于标识用户
 */
export const generateUserFingerprint = (): string => {
  if (typeof window === 'undefined') {
    // 服务端渲染时返回默认值
    return 'server-side-render';
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 获取基础信息
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  const screenResolution = `${screen.width}x${screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Canvas指纹
  let canvasFingerprint = '';
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Browser fingerprint', 2, 2);
    canvasFingerprint = canvas.toDataURL();
  }

  // WebGL指纹
  let webglFingerprint = '';
  try {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        webglFingerprint = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) +
                          gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch (e) {
    // WebGL not supported
  }

  // 组合所有信息
  const fingerprint = [
    userAgent,
    language,
    platform,
    screenResolution,
    timezone,
    canvasFingerprint.slice(-50), // 取canvas指纹的后50个字符
    webglFingerprint
  ].join('|');

  // 生成简单的hash
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(36);
};

/**
 * 生成随机session ID
 */
export const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * 生成UUID
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};


/**
 * 返回稳定的用户ID：
 * - 优先从 localStorage 读取
 * - 失败或无值则从 cookie 读取
 * - 都没有则生成 UUID，写入 localStorage 与 cookie
 * 说明：用户清理站点数据或使用隐私/无痕模式时，可能会变更，属不可避免情形。
 */
const USER_ID_STORAGE_KEY = 'docuo_user_id_v1';

const safeGetLocalStorage = (key: string): string | null => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetLocalStorage = (key: string, value: string): void => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
};

const getCookie = (name: string): string | null => {
  try {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
};

const setCookie = (name: string, value: string): void => {
  try {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    // 设定较长有效期（约 400 天，受浏览器策略限制）
    expires.setDate(expires.getDate() + 400);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}`;
  } catch {
    // ignore
  }
};

export const getStableUserId = (): string => {
  if (typeof window === 'undefined') return 'server-side-render';
  // 1) localStorage
  const l = safeGetLocalStorage(USER_ID_STORAGE_KEY);
  if (l) return l;
  // 2) cookie
  const c = getCookie(USER_ID_STORAGE_KEY);
  if (c) {
    safeSetLocalStorage(USER_ID_STORAGE_KEY, c);
    return c;
  }
  // 3) 生成并持久化
  const newId = generateUUID();
  safeSetLocalStorage(USER_ID_STORAGE_KEY, newId);
  setCookie(USER_ID_STORAGE_KEY, newId);
  return newId;
};
