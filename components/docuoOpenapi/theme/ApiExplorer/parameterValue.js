function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isPresent(value) {
  return value !== undefined && value !== null && value !== "";
}

function sanitizeParameterValue(schema, value) {
  if (!schema || !isPresent(value)) {
    return undefined;
  }

  if (schema.type === "array") {
    const source = Array.isArray(value) ? value : [value];
    const result = source
      .map((item) => sanitizeParameterValue(schema.items, item))
      .filter((item) => item !== undefined);
    return result.length > 0 ? result : undefined;
  }

  if (schema.type === "object") {
    if (!isObject(value)) {
      return undefined;
    }

    const result = Object.entries(schema.properties || {}).reduce(
      (object, [property, propertySchema]) => {
        const propertyValue = sanitizeParameterValue(
          propertySchema,
          value[property]
        );
        if (propertyValue !== undefined) {
          object[property] = propertyValue;
        }
        return object;
      },
      {}
    );
    return Object.keys(result).length > 0 ? result : undefined;
  }

  const scalar = Array.isArray(value) ? value[0] : value;
  if (!isPresent(scalar) || isObject(scalar)) {
    return undefined;
  }
  return String(scalar);
}

function sanitizeObjectArrayItems(items, properties) {
  return (
    sanitizeParameterValue(
      {
        type: "array",
        items: { type: "object", properties: properties || {} },
      },
      items
    ) || []
  );
}

function restoreParameterValue(param, storedValue) {
  return sanitizeParameterValue(param?.schema, storedValue);
}

module.exports = {
  restoreParameterValue,
  sanitizeObjectArrayItems,
  sanitizeParameterValue,
};
