export const locale = process.env.LOCALE || "zh";

const portList = {
  zh: [5665, 5666], // 5665 中文预览环境；5666 中文正式环境
  en: [5667, 5668], // 5667 英文预览环境；5668 英文正式环境
}[locale];

export const DATA_ENV = process.env.DATA_ENV || "pro";
export const port = DATA_ENV.includes("preview") ? portList[0] : portList[1];
export const isTestEnv = DATA_ENV.includes("test");
// console.log(process.env, 111);

export const tapdStoryConfig = {
  priority: "normal",
  status: "new",
  owner: locale === "zh" ? "张佳会" : "李钰",
  category_id: isTestEnv ? "1138132167001001926" : "1148250385001001928",
  workspace_id: isTestEnv ? 38132167 : 48250385,
};
