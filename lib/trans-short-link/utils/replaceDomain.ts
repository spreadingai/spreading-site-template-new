import { DataUtil } from "../assets/js/util/dataUtil";

export function replaceDomainOldToNew(url) {
  if (DataUtil.locale === "en") return url;
  // @ts-ignore
  if (process.server) {
    return url.replace("zego.im", "zegotech.cn");
  }
  if (typeof window !== "undefined" && location.host.endsWith("zegotech.cn"))
    return url.replace("zego.im", "zegotech.cn");
  return url;
}
