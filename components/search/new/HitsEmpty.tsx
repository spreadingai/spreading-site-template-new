import React from "react";
import { getEmptyText } from "./facetMapping";
import styles from "./index.module.scss";

interface Props {
  language?: string;
}

const HitsEmpty: React.FC<Props> = ({ language = "zh" }) => {
  const { main, feedback, suffix } = getEmptyText(language);
  return (
    <div className={styles.hitsEmpty}>
      <p>{main}</p>
      <p>
        {language === "zh" ? "您可 " : "You can "}
        <a
          className={styles.emptyFeedbackLink}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {feedback}
        </a>
        {suffix ? ` ${suffix}` : ""}
      </p>
    </div>
  );
};

export default HitsEmpty;
