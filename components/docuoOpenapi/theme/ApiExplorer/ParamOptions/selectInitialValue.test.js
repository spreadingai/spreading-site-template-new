const test = require("node:test");
const assert = require("node:assert/strict");

const {
  getSelectInitialValue,
  getObjectArrayInitialValues,
} = require("./selectInitialValue");

test("does not use a parameter example as an enum initial value", () => {
  assert.equal(
    getSelectInitialValue({
      example: "1",
      schema: { default: "0", enum: ["0", "1"] },
    }),
    undefined
  );
});

test("does not use a parameter example as object-array initial values", () => {
  assert.equal(typeof getObjectArrayInitialValues, "function");
  assert.deepEqual(
    getObjectArrayInitialValues({
      example: [{ FileId: "example-file" }],
    }),
    []
  );
});

test("restores persisted object-array values", () => {
  assert.equal(typeof getObjectArrayInitialValues, "function");
  assert.deepEqual(
    getObjectArrayInitialValues({
      value: [{ FileId: "saved-file" }],
      example: [{ FileId: "example-file" }],
    }),
    [{ FileId: "saved-file" }]
  );
});

test("keeps a persisted value instead of replacing it with the example", () => {
  assert.equal(
    getSelectInitialValue({
      value: "0",
      example: "1",
      schema: { default: "0", enum: ["0", "1"] },
    }),
    "0"
  );
});

test("keeps automatic selection for a single allowed value", () => {
  assert.equal(
    getSelectInitialValue({ schema: { enum: ["MergeMedia"] } }),
    "MergeMedia"
  );
});
