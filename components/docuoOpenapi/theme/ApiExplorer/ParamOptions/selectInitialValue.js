function getSelectInitialValue(param) {
  if (param.value !== undefined && param.value !== null) {
    return param.value;
  }

  const options = param.schema?.enum ?? [];
  return options.length === 1 ? options[0] : undefined;
}

function getObjectArrayInitialValues(param) {
  if (!Array.isArray(param.value)) {
    return [];
  }

  return param.value.filter(
    (value) =>
      value !== null && typeof value === "object" && !Array.isArray(value)
  );
}

module.exports = { getSelectInitialValue, getObjectArrayInitialValues };
