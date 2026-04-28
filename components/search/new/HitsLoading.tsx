import React from "react";
import { getLoadingText } from "./facetMapping";
import styles from "./index.module.scss";

interface Props {
  language?: string;
}

const HitsLoading: React.FC<Props> = ({ language = "zh" }) => {
  return (
    <div className={styles.hitsLoading}>
      <span>{getLoadingText(language)}</span>
    </div>
  );
};

export default HitsLoading;
