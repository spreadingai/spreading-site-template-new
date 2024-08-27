import LibControllerImpl from "./index";
import { DisplayLanguage } from "../types";

class LanguageController {
  static _instance: LanguageController;
  static getInstance() {
    return (
      LanguageController._instance ||
      (LanguageController._instance = new LanguageController())
    );
  }
  getDisplayLanguages() {
    const { i18n } = LibControllerImpl.getDocuoConfig();
    const result: {
      displayLanguages: DisplayLanguage[];
    } = { displayLanguages: [] };
    if (i18n && i18n.localeConfigs) {
      const keys = Object.keys(i18n.localeConfigs);

      // Put the default language first
      const defaultKeyIndex = keys.findIndex(
        (key) => key === i18n.defaultLocale
      );
      keys.unshift(keys.splice(defaultKeyIndex, 1)[0]);
      keys.forEach((suffix) => {
        result.displayLanguages.push({
          language: suffix,
          languageLabel: i18n.localeConfigs[suffix],
        });
      });
    }
    return result;
  }
  getDisplayLanguage(language: string, displayLanguages: DisplayLanguage[]) {
    const target = displayLanguages.find((item) => item.language === language);
    return target;
  }
}

export default LanguageController.getInstance();
