import React, { useEffect, useState } from "react";
import {
  getAISuggestionText,
  getRandomGroupId,
  getSuggestions,
} from "./facetMapping";
import { fetchWelcomePrompts } from "@/components/header/AskAI/api";
import styles from "./index.module.scss";

type Variant = "default" | "dropdown";

interface Props {
  query: string;
  onOpenAI?: (message?: string, defaultQuestions?: string[]) => void;
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
  const [isLoading, setIsLoading] = useState(false);

  const shouldUseApi = !query.trim();

  useEffect(() => {
    if (!shouldUseApi) return;
    let cancelled = false;
    setIsLoading(true);
    fetchWelcomePrompts({ language, product: getRandomGroupId(language) })
      .then((res) => {
        if (!cancelled) setApiSuggestions(res.data?.prompts ?? []);
      })
      .catch(() => {
        if (!cancelled) setApiSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [language, shouldUseApi]);

  const suggestions = shouldUseApi
    ? apiSuggestions
    : getSuggestions(query, language);
  if (isLoading || !suggestions.length) return null;

  const { prefix, link, suffix } = getAISuggestionText(language);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 750;
  const maxItems =
    variant === "dropdown" ? 3 : isMobile ? 2 : suggestions.length;
  const visibleSuggestions = suggestions.slice(0, maxItems);

  return (
    <div
      className={`${styles.aiSuggestion} ${variant === "dropdown" ? styles.aiSuggestionDropdown : ""} ${hasNoResults ? styles.aiSuggestionHasNoResults : ""}`}
    >
      <div className={styles.aiSuggestionCon}>
        <p className={styles.aiSuggestionHeader}>
          {prefix}
          <span
            className={styles.aiSuggestionLink}
            onClick={() => onOpenAI?.(undefined, suggestions)}
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
              onClick={() => onOpenAI?.(text, suggestions)}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISuggestion;
