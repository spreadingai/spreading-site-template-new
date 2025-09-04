// 完整复制 lib/trans-short-link/components/Document-Api/ClientApiDetail/markdownOptions.ts 的JavaScript版本

// 正确的paramCase实现，模拟change-case库的行为
const paramCase = (str) => {
  if (!str) return str;

  return str
    // 处理冒号，将冒号替换为连字符
    .replace(/:/g, '-')
    // 处理驼峰命名
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    // 处理连续大写字母
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    // 转换为小写
    .toLowerCase()
    // 移除开头的连字符
    .replace(/^-/, '')
    // 移除末尾的连字符
    .replace(/-$/, '')
    // 处理连续的连字符
    .replace(/-+/g, '-');
};

const paramCaseId = (raw, overloadFlag = '') => {
  let res = paramCase(raw) || raw;
  if (overloadFlag) {
    res = res + '-' + overloadFlag;
  }
  return res;
};

module.exports = {
  paramCaseId
};
