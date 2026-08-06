const {
  serializeQueryParams,
} = require("../ApiExplorer/querySerialization");

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getIndexLabel(serialization, depth) {
  const configured = serialization?.indexLabels?.[depth];
  if (configured) {
    return configured;
  }
  return ["N", "M", "K"][depth] || `I${depth + 1}`;
}

function buildObjectChildren({
  schema,
  path,
  serialization,
  arrayDepth,
}) {
  const requiredProperties = new Set(schema.required || []);
  return Object.entries(schema.properties || {}).map(
    ([property, propertySchema]) =>
      buildSchemaNode({
        schema: propertySchema,
        name: property,
        path: `${path}.${property}`,
        required: requiredProperties.has(property),
        serialization,
        arrayDepth,
      })
  );
}

function buildSchemaNode({
  schema,
  name,
  path,
  required,
  serialization,
  arrayDepth,
}) {
  if (schema?.type === "array") {
    const indexLabel = getIndexLabel(serialization, arrayDepth);
    const itemPath = `${path}.${indexLabel}`;
    const itemSchema = schema.items || { type: "any" };
    const children =
      itemSchema.type === "object"
        ? buildObjectChildren({
            schema: itemSchema,
            path: itemPath,
            serialization,
            arrayDepth: arrayDepth + 1,
          })
        : [];

    return {
      kind: "array",
      name,
      path,
      required,
      schema,
      indexLabel,
      itemSchema,
      ...(itemSchema.type !== "object" ? { queryName: itemPath } : {}),
      children,
    };
  }

  if (schema?.type === "object") {
    return {
      kind: "object",
      name,
      path,
      required,
      schema,
      children: buildObjectChildren({
        schema,
        path,
        serialization,
        arrayDepth,
      }),
    };
  }

  return {
    kind: "field",
    name,
    path,
    queryName: path,
    required,
    schema,
  };
}

function getRecursiveParameterTree(param) {
  const serialization = param["x-docuo-query-serialization"];
  if (
    serialization?.style !== "recursive-indexed-dot" ||
    param.schema?.type !== "array"
  ) {
    return null;
  }

  return buildSchemaNode({
    schema: param.schema,
    name: param.name,
    path: param.name,
    required: Boolean(param.required),
    serialization,
    arrayDepth: 0,
  });
}

function getStructureQualifierSchema(node) {
  if (node?.kind !== "array" || !Array.isArray(node.schema?.items?.enum)) {
    return node?.schema;
  }

  const { enum: _enum, ...items } = node.schema.items;
  return { ...node.schema, items };
}

function getParameterDisplayName(param) {
  return param["x-docuo-display-name"] || param.name;
}

function formatParameterExample(example) {
  if (example === undefined || example === null) {
    return null;
  }

  if (isObject(example) || (Array.isArray(example) && example.some(isObject))) {
    return { language: "json", value: JSON.stringify(example, null, 2) };
  }

  if (Array.isArray(example)) {
    return { language: "text", value: `[${example.join(", ")}]` };
  }

  return { language: "text", value: String(example) };
}

function formatIndexedDotQueryExample(param) {
  if (
    param["x-docuo-query-serialization"]?.style !==
      "recursive-indexed-dot" ||
    !Array.isArray(param.example)
  ) {
    return null;
  }

  const pairs = serializeQueryParams([{ ...param, value: param.example }]);
  return pairs.length > 0
    ? pairs
        .map(({ key, value }) =>
          value === null ? key : `${key}=${encodeURIComponent(value)}`
        )
        .join("&\n")
    : null;
}

function getVisibleParameterExamples(param) {
  const query = formatIndexedDotQueryExample(param);
  return {
    structured: query ? null : formatParameterExample(param.example),
    query,
  };
}

module.exports = {
  formatIndexedDotQueryExample,
  formatParameterExample,
  getVisibleParameterExamples,
  getRecursiveParameterTree,
  getStructureQualifierSchema,
  getParameterDisplayName,
};
