/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useEffect, useRef } from "react";

// import CodeBlock from "@theme/CodeBlock";
import { Code } from "@/components/mdx";
/* eslint-disable import/no-extraneous-dependencies*/
import clsx from "clsx";
import { createDescription } from "@/components/docuoOpenapi/markdown/createDescription";
/* eslint-disable import/no-extraneous-dependencies*/
import { guard } from "@/components/docuoOpenapi/markdown/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import useLanguage from "@/components/hooks/useLanguage";
import { copywriting } from "@/components/constant/language";


function SchemaItem({
  children: collapsibleSchemaContent,
  collapsible,
  name,
  qualifierMessage,
  required,
  schemaName,
  schema,
}) {
  const { currentLanguage } = useLanguage();
  const t = (copywriting[currentLanguage] && copywriting[currentLanguage].openapi) || copywriting.en.openapi;

  let deprecated;
  let schemaDescription;
  let defaultValue;
  let nullable;
  if (schema) {
    deprecated = schema.deprecated;
    schemaDescription = schema.description;
    defaultValue = schema.default;
    nullable = schema.nullable;
  }

  const renderRequired = guard(
    Array.isArray(required) ? required.includes(name) : required,
    () => <span className="openapi-schema__required">{t.content.requiredTag}</span>
  );

  const renderDeprecated = guard(deprecated, () => (
    <span className="openapi-schema__deprecated">{t.content.deprecatedTag}</span>
  ));

  const renderNullable = guard(nullable, () => (
    <span className="openapi-schema__nullable">nullable</span>
  ));

  const renderSchemaDescription = guard(schemaDescription, (description) => (
    <div>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={createDescription(description)}
        components={{
          pre: "div",
          a({ href, children, ...props }) {
            const raw = href || "";
            const isExternal = raw.startsWith("http") || raw.startsWith("mailto:") || raw.startsWith("tel:");
            if (isExternal || raw.startsWith("/article/")) return <a {...props} href={href}>{children}</a>;
            const clean = raw.split("#")[0].split("?")[0];
            const last = clean.substring(clean.lastIndexOf("/") + 1);
            const hasExt = /\.[^./]+$/.test(last);
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
            const needBase = raw.startsWith("/") && basePath && !raw.startsWith(`${basePath}/`) && !hasExt;
            const finalHref = needBase ? `${basePath}${raw}` : raw;
            return <a {...props} href={finalHref}>{children}</a>;
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (inline || !children.endsWith("\n")) return <code>{children}</code>;
            const lang = match ? match[1] : "text";
            const codeString = Array.isArray(children) ? children.join("") : children;
            return !inline ? (
              <Code code={codeString} lang={lang} className={className} />
            ) : (
              <Code code={codeString} lang="text" />
            );
          },
        }}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  ));

  const renderQualifierMessage = guard(qualifierMessage, (message) => {
    const localized =
      typeof message === "string"
        ? message.replace(/^\*{2}Possible values:\*{2}/, `**${t.content.possibleValuesLabel}:**`)
        : message;
    return (
      <div>
        <ReactMarkdown
          // eslint-disable-next-line react/no-children-prop
          children={createDescription(localized)}
          rehypePlugins={[rehypeRaw]}
          components={{
            a({ href, children, ...props }) {
              const raw = href || "";
              const isExternal = raw.startsWith("http") || raw.startsWith("mailto:") || raw.startsWith("tel:");
              if (isExternal || raw.startsWith("/article/")) return <a {...props} href={href}>{children}</a>;
              const clean = raw.split("#")[0].split("?")[0];
              const last = clean.substring(clean.lastIndexOf("/") + 1);
              const hasExt = /\.[^./]+$/.test(last);
              const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
              const needBase = raw.startsWith("/") && basePath && !raw.startsWith(`${basePath}/`) && !hasExt;
              const finalHref = needBase ? `${basePath}${raw}` : raw;
              return <a {...props} href={finalHref}>{children}</a>;
            },
          }}
        />
      </div>
    );
  });

  const renderDefaultValue = defaultValue !== undefined ? (
    <div className="">
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={`**${t.content.defaultValueLabel}:** \`${typeof defaultValue === "boolean" ? defaultValue.toString() : defaultValue}\``} />
    </div>
  ) : null;

  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // normalize required/deprecated text generated by markdown factory (details summary)
    root.querySelectorAll('.openapi-schema__required').forEach((el) => {
      if (el && el.textContent && el.textContent.trim().toLowerCase() === 'required') {
        el.textContent = t.content.requiredTag;
      }
    });
    root.querySelectorAll('.openapi-schema__deprecated').forEach((el) => {
      if (el && el.textContent && el.textContent.trim().toLowerCase() === 'deprecated') {
        el.textContent = t.content.deprecatedTag;
      }
    });
  }, [t]);

  const schemaContent = (
    <div>
      <span className="openapi-schema__container">
        <strong
          className={clsx("openapi-schema__property", {
            "openapi-schema__strikethrough": deprecated,
          })}
        >
          {name}
        </strong>
        <span className="openapi-schema__name"> {schemaName}</span>
        {(nullable || required || deprecated) && (
          <span className="openapi-schema__divider"></span>
        )}
        {renderNullable}
        {!deprecated && renderRequired}
        {renderDeprecated}
      </span>
      {renderQualifierMessage}
      {renderDefaultValue}
      {renderSchemaDescription}
      {collapsibleSchemaContent ?? collapsibleSchemaContent}
    </div>
  );

  return (
    <div className="openapi-schema__list-item" ref={rootRef}>
      {collapsible ? collapsibleSchemaContent : schemaContent}
    </div>
  );
}

export default SchemaItem;
