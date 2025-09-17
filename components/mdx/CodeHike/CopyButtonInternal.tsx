import React, { useState } from "react";
import styles from "./CopyButton.module.scss";

interface CopyButtonProps {
  text: string;
}

export function CopyButtonInternal({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      className={styles.copyButton}
      aria-label="Copy to clipboard"
      onClick={handleCopy}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="m5,15 L5,5 a2,2 0 0,1 2,-2 l10,0"></path>
        </svg>
      )}
    </button>
  );
}
