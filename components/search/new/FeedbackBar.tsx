import React from "react";
import { getFeedbackText } from "./facetMapping";
import styles from "./index.module.scss";

interface Props {
  language?: string;
}

const FeedbackBar: React.FC<Props> = ({ language = "zh" }) => {
  const { text, btn } = getFeedbackText(language);
  return (
    <div className={styles.feedbackBar}>
      <span className={styles.feedbackText}>{text}</span>
      <a
        className={styles.feedbackBtn}
        href="#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.feedbackBtnIcon} />
        {btn}
      </a>
    </div>
  );
};

export default FeedbackBar;
