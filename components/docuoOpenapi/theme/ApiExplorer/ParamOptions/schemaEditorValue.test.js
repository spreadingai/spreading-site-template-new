const test = require("node:test");
const assert = require("node:assert/strict");

let schemaEditorValue = {};
try {
  schemaEditorValue = require("./schemaEditorValue");
} catch {}

const { createEmptySchemaValue, getAvailableEnumOptions } = schemaEditorValue;

test("creates the correct empty value for each schema container", () => {
  assert.equal(typeof createEmptySchemaValue, "function");
  assert.deepEqual(createEmptySchemaValue({ type: "object" }), {});
  assert.deepEqual(createEmptySchemaValue({ type: "array" }), []);
  assert.equal(createEmptySchemaValue({ type: "string" }), "");
});

test("removes enum values selected by other unique array items", () => {
  assert.equal(typeof getAvailableEnumOptions, "function");
  assert.deepEqual(
    getAvailableEnumOptions(
      ["360p", "540p", "720p"],
      ["360p", "720p"],
      1
    ),
    ["540p", "720p"]
  );
});

test("keeps all enum values when the array is not unique", () => {
  assert.equal(typeof getAvailableEnumOptions, "function");
  assert.deepEqual(
    getAvailableEnumOptions(
      ["360p", "540p", "720p"],
      ["360p", "720p"],
      1,
      false
    ),
    ["360p", "540p", "720p"]
  );
});
