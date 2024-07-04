import styles from "./ThemeSwitch.module.scss";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import IconLanguageNorLight from "@/assets/icons/header/icon_language_nor_light.svg";
import IconLanguageNorDark from "@/assets/icons/header/icon_language_nor_dark.svg";
import { DisplayLanguage } from "@/lib/types";
import { useRouter } from "next/router";

interface LanguageSwitchProps {
  className?: string;
  displayLanguages: DisplayLanguage[];
  currentLanguage: string;
  currentLanguageLabel: string;
}

const LanguageSwitch = (props: LanguageSwitchProps) => {
  const router = useRouter();
  const { className = "", displayLanguages, currentLanguage } = props;

  const handleThemeChanged: MenuProps["onClick"] = ({ key: language }) => {
    const target = displayLanguages.find((item) => item.language === language);
    router.push({ pathname: target.defaultLink });
  };

  const items = displayLanguages.map((item) => ({
    key: item.language,
    label: <span>{item.languageLabel}</span>,
    className: `${styles.modeItem} ${
      item.language === currentLanguage ? styles.active : ""
    }`,
  }));

  return (
    <div className={`${styles.languageToggle} ${className}`}>
      <Dropdown
        trigger={["click"]}
        menu={{
          items,
          className: styles.languageWrapper,
          onClick: handleThemeChanged,
        }}
        placement="bottomRight"
      >
        <button className={styles.toggleButton}>
          <IconLanguageNorLight className={styles.lightToggleIcon} />
          <IconLanguageNorDark className={styles.darkToggleIcon} />
        </button>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitch;
