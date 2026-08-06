import React from "react";

import FormItem from "@/components/docuoOpenapi/theme/ApiExplorer/FormItem";
import FormSelect from "@/components/docuoOpenapi/theme/ApiExplorer/FormSelect";
import FormTextInput from "@/components/docuoOpenapi/theme/ApiExplorer/FormTextInput";
import type { ParameterValue } from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions/slice";
import {
  createEmptySchemaValue,
  getAvailableEnumOptions,
} from "../schemaEditorValue";

type Props = {
  schema: any;
  value?: ParameterValue;
  path: string;
  required?: boolean;
  enumOptions?: string[];
  onChange: (value?: ParameterValue) => void;
};

function fieldName(path: string) {
  return `recursive-${path.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function ScalarValueEditor({
  schema,
  value,
  path,
  required,
  enumOptions,
  onChange,
}: Props) {
  const scalarValue = typeof value === "string" ? value : "";
  const options = enumOptions || schema.enum?.map(String);

  if (Array.isArray(options)) {
    const selectable = required ? options : ["---", ...options];
    return (
      <FormSelect
        value={scalarValue || undefined}
        options={selectable}
        onChange={(nextValue) =>
          onChange(nextValue === "---" ? undefined : nextValue)
        }
      />
    );
  }

  return (
    <FormTextInput
      isRequired={required}
      paramName={fieldName(path)}
      placeholder={schema.description || path}
      value={scalarValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value || undefined)
      }
    />
  );
}

function ObjectValueEditor({ schema, value, path, onChange }: Props) {
  const objectValue =
    value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const requiredProperties = new Set(schema.required || []);

  return (
    <div className="openapi-explorer__recursive-object">
      {Object.entries(schema.properties || {}).map(
        ([property, propertySchema]: [string, any]) => {
          const propertyPath = `${path}.${property}`;
          return (
            <FormItem
              key={property}
              label={property}
              type={propertySchema.type}
              required={requiredProperties.has(property)}
            >
              <SchemaValueEditor
                schema={propertySchema}
                value={objectValue[property]}
                path={propertyPath}
                required={requiredProperties.has(property)}
                onChange={(propertyValue) => {
                  const nextValue = { ...objectValue };
                  if (propertyValue === undefined) {
                    delete nextValue[property];
                  } else {
                    nextValue[property] = propertyValue;
                  }
                  onChange(nextValue);
                }}
              />
            </FormItem>
          );
        }
      )}
    </div>
  );
}

function ArrayValueEditor({ schema, value, path, onChange }: Props) {
  const values = Array.isArray(value) ? value : [];
  const maximum = Number(schema.maxItems) || Number.POSITIVE_INFINITY;
  const itemSchema = schema.items || {};

  return (
    <div className="openapi-explorer__recursive-array">
      {values.map((item, index) => {
        const itemPath = `${path}.${index}`;
        const isContainer =
          itemSchema.type === "object" || itemSchema.type === "array";
        const enumOptions = Array.isArray(itemSchema.enum)
          ? getAvailableEnumOptions(
              itemSchema.enum.map(String),
              values,
              index,
              schema.uniqueItems === true
            )
          : undefined;

        return (
          <div
            className="openapi-explorer__object-array-item"
            key={`${itemPath}-${index}`}
          >
            <div className="openapi-explorer__object-array-header">
              <strong>{itemPath}</strong>
              <button
                type="button"
                className="openapi-explorer__delete-btn"
                onClick={() =>
                  onChange(values.filter((_, itemIndex) => itemIndex !== index))
                }
                aria-label={`Delete ${itemPath}`}
              >
                ×
              </button>
            </div>

            {isContainer ? (
              <SchemaValueEditor
                schema={itemSchema}
                value={item}
                path={itemPath}
                required
                onChange={(itemValue) => {
                  const nextValues = [...values];
                  nextValues[index] =
                    itemValue ?? createEmptySchemaValue(itemSchema);
                  onChange(nextValues);
                }}
              />
            ) : (
              <FormItem
                label={itemPath}
                type={itemSchema.type}
                required
              >
                <SchemaValueEditor
                  schema={itemSchema}
                  value={item}
                  path={itemPath}
                  required
                  enumOptions={enumOptions}
                  onChange={(itemValue) => {
                    const nextValues = [...values];
                    nextValues[index] = itemValue ?? "";
                    onChange(nextValues);
                  }}
                />
              </FormItem>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className="openapi-explorer__thin-btn"
        disabled={values.length >= maximum}
        onClick={() =>
          onChange([...values, createEmptySchemaValue(itemSchema)])
        }
      >
        Add item
      </button>
    </div>
  );
}

export default function SchemaValueEditor(props: Props) {
  if (props.schema?.type === "array") {
    return <ArrayValueEditor {...props} />;
  }

  if (props.schema?.type === "object") {
    return <ObjectValueEditor {...props} />;
  }

  return <ScalarValueEditor {...props} />;
}
