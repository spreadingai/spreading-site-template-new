// 完整复制 lib/trans-short-link/utils/replaceDomain.ts 的JavaScript版本

const { DataUtil } = require('../assets/js/util/dataUtil');

function replaceDomainOldToNew(url) {
  if (DataUtil.locale === "en") return url;
  
  // 在Node.js环境中，没有process.server，使用环境变量判断
  if (process.env.NODE_ENV === 'production') {
    return url.replace("zego.im", "zegotech.cn");
  }
  
  // 在Node.js环境中，没有window和location对象
  const host = process.env.HOST || '';
  if (host.endsWith("zegotech.cn")) {
    return url.replace("zego.im", "zegotech.cn");
  }
  
  return url;
}

module.exports = {
  replaceDomainOldToNew
};
