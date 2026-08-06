function isPresent(value) {
  return value !== undefined && value !== null && value !== "";
}

function recursiveIndexedDotPairs(schema, value, path, serialization) {
  if (!schema || !isPresent(value)) {
    return [];
  }

  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      return [];
    }

    let emittedIndex = 0;
    return value.flatMap((item) => {
      const start = Number.isInteger(serialization.indexStart)
        ? serialization.indexStart
        : 0;
      const pairs = recursiveIndexedDotPairs(
        schema.items,
        item,
        `${path}.${start + emittedIndex}`,
        serialization
      );
      if (pairs.length > 0) {
        emittedIndex += 1;
      }
      return pairs;
    });
  }

  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return [];
    }

    return Object.entries(schema.properties || {}).flatMap(
      ([property, propertySchema]) =>
        recursiveIndexedDotPairs(
          propertySchema,
          value[property],
          `${path}.${property}`,
          serialization
        )
    );
  }

  return [{ key: path, value: String(value) }];
}

function serializeQueryParams(queryParams) {
  return queryParams.flatMap((param) => {
    if (param.value === undefined || param.value === null) {
      return [];
    }

    const serialization = param["x-docuo-query-serialization"];
    if (
      serialization?.style === "recursive-indexed-dot" &&
      Array.isArray(param.value)
    ) {
      return recursiveIndexedDotPairs(
        param.schema,
        param.value,
        param.name,
        serialization
      );
    }

    if (Array.isArray(param.value)) {
      return param.value.map((value) => ({
        key: `${param.name}[]`,
        value: String(value),
      }));
    }

    if (param.allowEmptyValue && param.schema?.type === "boolean") {
      return param.value === "true"
        ? [{ key: param.name, value: null }]
        : [];
    }

    return [{ key: param.name, value: String(param.value) }];
  });
}

module.exports = { serializeQueryParams };
