function createEmptySchemaValue(schema) {
  if (schema?.type === "object") {
    return {};
  }
  if (schema?.type === "array") {
    return [];
  }
  return "";
}

function getAvailableEnumOptions(options, values, currentIndex, unique = true) {
  if (!unique) {
    return options;
  }

  const selectedElsewhere = new Set(
    values
      .filter((_, index) => index !== currentIndex)
      .map((value) => String(value))
  );
  return options.filter((option) => !selectedElsewhere.has(String(option)));
}

module.exports = { createEmptySchemaValue, getAvailableEnumOptions };
