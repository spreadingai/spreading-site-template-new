import React, { useEffect, useState } from "react";
import { getAISuggestionText, getSuggestions, USE_API_SUGGESTIONS } from "./facetMapping";
import { fetchWelcomePrompts } from "@/components/header/AskAI/api";
import styles from "./index.module.scss";

type Variant = "default" | "dropdown";

interface Props {
  query: string;
  onOpenAI?: (message?: string) => void;
  language?: string;
  variant?: Variant;
  hasNoResults?: boolean;
}

const AISuggestion: React.FC<Props> = ({
  query,
  onOpenAI,
  language = "zh",
  variant = "default",
  hasNoResults = false,
}) => {
  const [apiSuggestions, setApiSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(USE_API_SUGGESTIONS);

  useEffect(() => {
    if (!USE_API_SUGGESTIONS) return;
    let cancelled = false;
    setIsLoading(true);
    fetchWelcomePrompts({ language })
      .then((res) => {
        if (!cancelled) setApiSuggestions(res.data?.prompts ?? []);
      })
      .catch(() => {
        if (!cancelled) setApiSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [language]);

  const suggestions = USE_API_SUGGESTIONS ? apiSuggestions : getSuggestions(query, language);
  if (isLoading || !suggestions.length) return null;

  const { prefix, link, suffix } = getAISuggestionText(language);
  const maxItems = variant === "dropdown" ? 3 : suggestions.length;
  const visibleSuggestions = suggestions.slice(0, maxItems);

  return (
    <div className={`${styles.aiSuggestion} ${variant === "dropdown" ? styles.aiSuggestionDropdown : ""} ${hasNoResults ? styles.aiSuggestionHasNoResults : ""}`}>
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
