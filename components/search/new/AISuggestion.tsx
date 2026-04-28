import React from "react";
import { getAISuggestionText, getSuggestions } from "./facetMapping";
import styles from "./index.module.scss";

interface Props {
  query: string;
  onOpenAI?: (message?: string) => void;
  language?: string;
}

const AISuggestion: React.FC<Props> = ({
  query,
  onOpenAI,
  language = "zh",
}) => {
  const suggestions = getSuggestions(query, language);
  if (!suggestions.length) return null;

  const { prefix, link, suffix } = getAISuggestionText(language);

  return (
    <div className={styles.aiSuggestion}>
      <p className={styles.aiSuggestionHeader}>
        {prefix}
        <span
          className={styles.aiSuggestionLink}
          onClick={() => onOpenAI?.()}
        >
          {link}
        </span>
        {suffix}
      </p>
      <div className={styles.aiSuggestionGrid}>
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            type="button"
            className={styles.aiSuggestionItem}
            onClick={() => onOpenAI?.(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISuggestion;
