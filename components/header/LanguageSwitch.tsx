import styles from "./ThemeSwitch.module.scss";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import IconLanguageNorLight from "@/assets/icons/header/icon_language_nor_light.svg";
import IconLanguageNorDark from "@/assets/icons/header/icon_language_nor_dark.svg";
import { useRouter } from "next/router";
import useLanguage from "@/components/hooks/useLanguage";

interface LanguageSwitchProps {
  className?: string;
  handleLanguageChanged?: MenuProps["onClick"];
}

const LanguageSwitch = (props: LanguageSwitchProps) => {
  const { currentLanguage, displayLanguages } = useLanguage();
  const router = useRouter();
  const { className = "", handleLanguageChanged } = props;

  const defaultHandleLanguageChanged: MenuProps["onClick"] = ({
    key: language,
  }) => {
    const target = displayLanguages.find((item) => item.language === language);
    localStorage.setItem("search-language", language);
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
          onClick: handleLanguageChanged || defaultHandleLanguageChanged,
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
