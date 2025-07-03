import { useEffect, useState } from "react";
import TabSwitch from "../header/TabSwitch";
import styles from "./index.module.scss";
import useTab from "../hooks/useTab";

const SubHeader = () => {
  const [scrollLength, setScrollLength] = useState(0);
  const [hiddenTab, setHiddenTab] = useState(true);
  const { displayTabs, shouldShowTabs } = useTab();

  useEffect(() => {
    const handleScroll = () => {
      setScrollLength(
        document.documentElement.scrollTop || document.body.scrollTop
      );
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  useEffect(() => {
      setHiddenTab(!shouldShowTabs || displayTabs.length <= 1);
  }, [shouldShowTabs, displayTabs]);

  return (
    <div
      className={`${styles.previewSubHeader} ${
        scrollLength === 0 ? styles.bgOpacity : ""
      } ${hiddenTab ? styles.hiddenTab : ""}`}
    >
      <TabSwitch />
    </div>
  );
};

export default SubHeader;
