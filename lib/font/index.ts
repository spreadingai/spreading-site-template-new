// 字体配置接口
interface FontConfig {
  primary: string;
  lexendDecaLight: string;
  lexendDecaRegular: string;
  lexendDeca: string;
  lexendDecaMedium: string;
  lexendDecaSemibold: string;
  interLight: string;
  inter: string;
  interRegular: string;
  interMedium: string;
  interSemibold: string;
  interBold: string;
  robotoMonoLight: string;
  robotoMono: string;
  robotoMonoRegular: string;
  robotoMonoMedium: string;
  robotoMonoBold: string;
  menlo: string;
}

// 语言字体映射
const LANGUAGE_FONTS: Record<string, FontConfig> = {
  // 中文字体配置
  zh: {
    primary:
      "'PingFangSC-Light', 'Helvetica Neue', 'Hiragino Sansgb', 'Arial', 'Microsoft Yahei', 'Microsoft Yahei ui', 'Simsun', 'Sans-serif'",
    lexendDeca: "LexendDeca",
    lexendDecaLight: "LexendDeca-Light",
    lexendDecaRegular: "LexendDeca-Regular",
    lexendDecaMedium: "LexendDeca-Medium",
    lexendDecaSemibold: "LexendDeca-SemiBold",
    interLight: "'PingFangSC-Light', 'Helvetica Neue', 'Hiragino Sansgb', 'Arial', 'Microsoft Yahei', 'Microsoft Yahei ui', 'Simsun', 'Sans-serif'",
    inter: "'PingFangSC-Light', 'Helvetica Neue', 'Hiragino Sansgb', 'Arial', 'Microsoft Yahei', 'Microsoft Yahei ui', 'Simsun', 'Sans-serif'",
    interRegular: "'PingFangSC-Regular', 'Helvetica Neue', 'Hiragino Sansgb', 'Arial', 'Microsoft Yahei', 'Microsoft Yahei ui', 'Simsun', 'Sans-serif'",
    interMedium: "'PingFangSC-Medium', 'Helvetica Neue', 'Hiragino Sansgb', 'Arial', 'Microsoft Yahei', 'Microsoft Yahei ui', 'Simsun', 'Sans-serif'",
    interSemibold: "'PingFangSC-SemiBold', 'Helvetica Neue', 'Hiragino Sansgb', 'Arial', 'Microsoft Yahei', 'Microsoft Yahei ui', 'Simsun', 'Sans-serif'",
    interBold: "'PingFangSC-Bold', 'Helvetica Neue', 'Hiragino Sansgb', 'Arial', 'Microsoft Yahei', 'Microsoft Yahei ui', 'Simsun', 'Sans-serif'",
    robotoMonoLight: "RobotoMono-Light",
    robotoMono: "RobotoMono",
    robotoMonoRegular: "RobotoMono-Regular",
    robotoMonoMedium: "RobotoMono-Medium",
    robotoMonoBold: "RobotoMono-Bold",
    menlo: "Menlo",
  },
  // 英文字体配置（保持现有字体）
  en: {
    primary: "Inter, sans-serif",
    lexendDeca: "LexendDeca",
    lexendDecaLight: "LexendDeca-Light",
    lexendDecaRegular: "LexendDeca-Regular",
    lexendDecaMedium: "LexendDeca-Medium",
    lexendDecaSemibold: "LexendDeca-SemiBold",
    interLight: "Inter-Light",
    inter: "Inter",
    interRegular: "Inter-Regular",
    interMedium: "Inter-Medium",
    interSemibold: "Inter-SemiBold",
    interBold: "Inter-Bold",
    robotoMonoLight: "RobotoMono-Light",
    robotoMono: "RobotoMono",
    robotoMonoRegular: "RobotoMono-Regular",
    robotoMonoMedium: "RobotoMono-Medium",
    robotoMonoBold: "RobotoMono-Bold",
    menlo: "Menlo",
  },
};

class FontManager {
  private static instance: FontManager;
  private currentLanguage: string = "en";

  private constructor() {}

  static getInstance(): FontManager {
    if (!FontManager.instance) {
      FontManager.instance = new FontManager();
    }
    return FontManager.instance;
  }

  // 设置当前语言
  setLanguage(language: string): void {
    this.currentLanguage = language;
    this.updateFontVariables();
  }

  // 获取当前字体配置
  getFontConfig(): FontConfig {
    return LANGUAGE_FONTS[this.currentLanguage] || LANGUAGE_FONTS.en;
  }

  // 更新 CSS 变量
  private updateFontVariables(): void {
    if (typeof window === "undefined") return;

    const config = this.getFontConfig();

    const style = document.createElement("style");
    style.id = "dynamic-font-variables";

    style.textContent = `
      :root {
        --font-primary: ${config.primary};
        --font-lexend-deca: ${config.lexendDeca};
        --font-lexend-deca-light: ${config.lexendDecaLight};
        --font-lexend-deca-regular: ${config.lexendDecaRegular};
        --font-lexend-deca-medium: ${config.lexendDecaMedium};
        --font-lexend-deca-semibold: ${config.lexendDecaSemibold};
        --font-inter: ${config.inter};
        --font-inter-light: ${config.interLight};
        --font-inter-regular: ${config.interRegular};
        --font-inter-medium: ${config.interMedium};
        --font-inter-semibold: ${config.interSemibold};
        --font-inter-bold: ${config.interBold};
        --font-roboto-mono: ${config.robotoMono};
        --font-roboto-mono-light: ${config.robotoMonoLight};
        --font-roboto-mono-regular: ${config.robotoMonoRegular};
        --font-roboto-mono-medium: ${config.robotoMonoMedium};
        --font-roboto-mono-bold: ${config.robotoMonoBold};
        --font-menlo: ${config.menlo};
      }
      /* 全局字体应用 */
      html body {
        font-family: var(--font-primary);
      }
    `;

    // 移除旧的样式
    const oldStyle = document.getElementById("dynamic-font-variables");
    if (oldStyle) {
      oldStyle.remove();
    }

    document.head.appendChild(style);
  }

  // 初始化字体
  init(): void {
    this.updateFontVariables();
  }
}

export default FontManager;
