import { locale } from "../config";

export const isZhClient = typeof window !== "undefined" && locale === "zh";

export function replaceDomainOldToNew(url) {
  if (locale === "en") return url;
  // @ts-ignore
  if (process.server) {
    return url.replace("zego.im", "zegotech.cn");
  }
  if (typeof window !== "undefined" && location.host.endsWith("zegotech.cn"))
    return url.replace("zego.im", "zegotech.cn");
  return url;
}

export function checkAndReplaceDomain() {
  console.log("checkAndReplaceDomain");
  // 保持现有默认链接为xxx.zego.im
  // 页面加载完 或者 客户端路由切换后
  // 判断如果是新域名处理，旧域名啥也不做
  // 过渡阶段如此，后续废弃zego.im后删除上述逻辑，全局替换所有链接
  if (!isZhClient) return;
  console.log("isZhClient");
  if (location.host.endsWith("zegotech.cn")) {
    // 获取所有的的链接是xxx.zego.im的域名，替换为新域名
    const linkList = document.querySelectorAll("a[href*='.zego.im']") as any;
    console.log("linkList", linkList);

    for (const link of linkList) {
      link.href = replaceDomainOldToNew(link.href);
    }
  }
}

// 替换所有的window.open(url)为window.customOpen(url)
// 替换所有的window.location.href = url为window.customOpen(url, false)
if (typeof window !== "undefined") {
  (window as any).customOpen = (url, _blank = true) => {
    if (locale === "zh") url = replaceDomainOldToNew(url);
    if (_blank) {
      window.open(url);
      return;
    }
    window.location.href = url;
  };
}
