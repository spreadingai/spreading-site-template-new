import React from "react";
import styles from "./index.module.scss";

interface Props {
  query: string;
  onOpenAI?: (message?: string) => void;
}

// 占位：根据搜索词生成关联问题，后续替换为实际映射
export function getSuggestions(query: string): string[] {
  if (!query.trim()) return [];
  return [
    `${query}是什么`,
    `${query} SDK 的集成文档`,
    `怎么下载${query} SDK`,
    `${query} 支持哪些平台`,
  ];
}

const AISuggestion: React.FC<Props> = ({ query, onOpenAI }) => {
  const suggestions = getSuggestions(query);
  if (!suggestions.length) return null;

  return (
    <div className={styles.aiSuggestion}>
      <p className={styles.aiSuggestionHeader}>
        搜索支持{" "}
        <span
          className={styles.aiSuggestionLink}
          onClick={() => onOpenAI?.()}
        >
          询问 AI 文档助手
        </span>{" "}
        啦！猜您想问：
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
