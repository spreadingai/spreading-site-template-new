// 完整复制 lib/trans-short-link/components/Document-Api/ClientApiDetail/markdownOptions.ts 的JavaScript版本

// 简单的paramCase实现
const paramCase = (str) => {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
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
