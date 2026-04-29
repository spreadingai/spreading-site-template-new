import React from "react";
import { getAISuggestionText, getSuggestions } from "./facetMapping";
import styles from "./index.module.scss";

type Variant = "default" | "dropdown";

interface Props {
  query: string;
  onOpenAI?: (message?: string) => void;
  language?: string;
  variant?: Variant;
}

const AISuggestion: React.FC<Props> = ({
  query,
  onOpenAI,
  language = "zh",
  variant = "default",
}) => {
  const suggestions = getSuggestions(query, language);
  if (!suggestions.length) return null;

  const { prefix, link, suffix } = getAISuggestionText(language);
  const maxItems = variant === "dropdown" ? 3 : suggestions.length;
  const visibleSuggestions = suggestions.slice(0, maxItems);

  return (
    <div className={`${styles.aiSuggestion} ${variant === "dropdown" ? styles.aiSuggestionDropdown : ""}`}>
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
        {visibleSuggestions.map((text, idx) => (
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
