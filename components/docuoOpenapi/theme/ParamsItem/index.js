/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

// import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock";
import { Code } from "@spreading/docuo-mdx-component";
import SchemaTabs from "@/components/docuoOpenapi/theme/SchemaTabs";
import TabItem from "@/components/docuoOpenapi/theme-classic/src/theme/TabItem";
/* eslint-disable import/no-extraneous-dependencies*/
import { createDescription } from "@/components/docuoOpenapi/markdown/createDescription";
/* eslint-disable import/no-extraneous-dependencies*/
import {
  getQualifierMessage,
  getSchemaName,
} from "@/components/docuoOpenapi/markdown/schema";
/* eslint-disable import/no-extraneous-dependencies*/
import { guard, toString } from "@/components/docuoOpenapi/markdown/utils";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function ParamsItem({
  param: { description, example, examples, name, required, schema },
}) {
  if (!schema || !schema?.type) {
    schema = { type: "any" };
  }

  const renderSchemaName = guard(schema, (schema) => (
    <span className="openapi-schema__type"> {getSchemaName(schema)}</span>
  ));

  const renderSchemaRequired = guard(required, () => (
    <span className="openapi-schema__required">required</span>
  ));

  const renderSchema = guard(getQualifierMessage(schema), (message) => (
    <div>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={createDescription(message)}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  ));

  const renderDescription = guard(description, (description) => (
    <div>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={createDescription(description)}
        components={{
          pre: "div",
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (inline) return <code>{children}</code>;
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

  const defaultValue = schema && schema.items
    ? schema.items.default
    : schema
    ? schema.default
    : undefined;

  const renderDefaultValue = defaultValue !== undefined ? (
    <div>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={`**Default value:** \`${defaultValue}\``} />
    </div>
  ) : null;

  const renderExample = guard(toString(example), (example) => (
    <div>
      <strong>Example: </strong>
      {example}
    </div>
  ));

  const renderExamples = guard(examples, (examples) => {
    const exampleEntries = Object.entries(examples);
    return (
      <>
        <strong>Examples:</strong>
        <SchemaTabs>
          {exampleEntries.map(([exampleName, exampleProperties]) => (
            <TabItem value={exampleName} label={exampleName} key={exampleName}>
              {exampleProperties.summary && <p>{exampleProperties.summary}</p>}
              {exampleProperties.description && (
                <p>
                  <strong>Description: </strong>
                  <span>{exampleProperties.description}</span>
                </p>
              )}
              <p>
                <strong>Example: </strong>
                <code>{exampleProperties.value}</code>
              </p>
            </TabItem>
          ))}
        </SchemaTabs>
      </>
    );
  });

  return (
    <div className="openapi-params__list-item">
      <span className="openapi-schema__container">
        <strong className="openapi-schema__property">{name}</strong>
        {renderSchemaName}
        {required && <span className="openapi-schema__divider"></span>}
        {renderSchemaRequired}
      </span>
      {renderSchema ? (
        <div className="openapi-params_schema">{renderSchema} </div>
      ) : null}
      {renderDefaultValue ? (
        <div className="openapi-params_default_value">{renderDefaultValue}</div>
      ) : null}
      {renderDescription ? (
        <div className="openapi-params_description">{renderDescription}</div>
      ) : null}
      {renderExample ? (
        <div className="openapi-params_example">{renderExample}</div>
      ) : null}
      {renderExamples ? (
        <div className="openapi-params_examples">{renderExamples}</div>
      ) : null}
    </div>
  );
}

export default ParamsItem;
