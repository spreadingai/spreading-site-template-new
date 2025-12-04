import React, { useEffect, useRef } from "react";
import styles from "./ParamField.module.scss";

// Slug generation function to match github-slugger behavior
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export interface ParamFieldProps {
  name: string;
  prototype: string;
  desc?: string;
  prefixes?: string[];
  suffixes?: string[];
  parent_file?: string;
  parent_name?: string;
  parent_type?: "class" | "interface" | "protocol" | "enum";
  titleSize?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

function renderPrototypeWithLinks(prototype: string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(prototype)) !== null) {
    const [full, text, href] = match;

    if (match.index > lastIndex) {
      parts.push(prototype.slice(lastIndex, match.index));
    }

    parts.push(
      <a key={`proto-link-${parts.length}`} href={href}>
        {text}
      </a>
    );

    lastIndex = match.index + full.length;
  }

  if (lastIndex < prototype.length) {
    parts.push(prototype.slice(lastIndex));
  }

  return parts;
}

// Convert escaped backticks \`...\` to <code> tags in parent_file
function renderParentFileWithCode(text: string): React.ReactNode {
  const regex = /\\`([^`]+)\\`/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [full, codeText] = match;

    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <code key={`code-${parts.length}`}>{codeText}</code>
    );

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function ParamField(props: ParamFieldProps) {
  const {
    name,
    prototype,
    desc,
    prefixes = [],
    suffixes = [],
    parent_file,
    parent_name,
    parent_type,
    titleSize = 4,
    children,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Generate primary anchor ID using generateSlug() to match TOC behavior
  const primaryAnchorId = generateSlug(name);

  // Generate additional anchors for parent context (only for non-enum types)
  const additionalAnchors: string[] = [];
  if (parent_type && parent_type !== "enum" && parent_name) {
    additionalAnchors.push(generateSlug(`${name}-${parent_name}`));
    additionalAnchors.push(generateSlug(`${name}-${parent_name}-${parent_type}`));
  }

  const HeadingTag = headingTags[titleSize] as keyof JSX.IntrinsicElements;

  return (
    <>
      {/* Hidden heading for TOC - use primary anchor ID */}
      <HeadingTag id={primaryAnchorId} className={styles.hiddenHeading}>
        {name}
      </HeadingTag>

      {/* Additional anchor targets for parent context (e.g., name-ParentClass, name-ParentClass-interface) */}
      {additionalAnchors.map((anchorId) => (
        <span key={anchorId} id={anchorId} className={styles.anchorTarget} />
      ))}

      <div ref={wrapperRef} className={styles.wrapper}>

        {/* Head section */}
        <div className={styles.head}>
          <div className={styles.headContent}>
            <div className={styles.prefixesTags}>
              {prefixes.map((prefix, idx) => (
                <span key={`prefix-${idx}`} className={styles.prefixTag}>
                  {prefix}
                </span>
              ))}
            </div>

            <div className={styles.nameDisplay}>{name}</div>

            <div className={styles.suffixesTags}>
              {suffixes.map((suffix, idx) => (
                <span key={`suffix-${idx}`} className={styles.suffixTag}>
                  {suffix}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prototype section */}
        <div className={styles.prototype}>
          <code>{renderPrototypeWithLinks(prototype)}</code>
        </div>

        {/* Body section */}
        <div className={styles.body}>
          {desc && <div className={styles.desc}>{desc}</div>}
          {parent_file && (
            <div className={styles.parentFile}>
              <em>{renderParentFileWithCode(parent_file)}</em>
            </div>
          )}
          {children && <div className={styles.children}>{children}</div>}
        </div>
      </div>
    </>
  );
}

