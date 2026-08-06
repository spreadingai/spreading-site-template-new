const test = require("node:test");
const assert = require("node:assert/strict");

const {
  restoreParameterValue,
  sanitizeParameterValue,
  sanitizeObjectArrayItems,
} = require("./parameterValue");

test("restores object-array parameter values without stringifying objects", () => {
  const param = {
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          FileId: { type: "string" },
          StartTime: { type: "number" },
        },
      },
    },
  };

  assert.deepEqual(
    restoreParameterValue(param, [
      { FileId: "file-001", StartTime: 0 },
      { FileId: "file-002", StartTime: 10 },
    ]),
    [
      { FileId: "file-001", StartTime: "0" },
      { FileId: "file-002", StartTime: "10" },
    ]
  );
});

test("keeps primitive array and scalar restoration behavior", () => {
  assert.deepEqual(
    restoreParameterValue(
      { schema: { type: "array", items: { type: "string" } } },
      [1, 2]
    ),
    ["1", "2"]
  );
  assert.equal(
    restoreParameterValue({ schema: { type: "string" } }, ["first", "second"]),
    "first"
  );
});

test("sanitizes object-array items to declared non-empty properties", () => {
  const properties = {
    FileId: { type: "string" },
    StartTime: { type: "number" },
    EndTime: { type: "number" },
  };

  assert.deepEqual(
    sanitizeObjectArrayItems(
      [
        {
          FileId: "file-001",
          StartTime: "0",
          EndTime: "",
          Unknown: "ignored",
        },
      ],
      properties
    ),
    [{ FileId: "file-001", StartTime: "0" }]
  );
});

test("restores arrays nested inside object-array parameters", () => {
  const param = {
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          FileId: { type: "string" },
          Resolution: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    },
  };

  assert.deepEqual(
    restoreParameterValue(param, [
      {
        FileId: "file-001",
        Resolution: ["360p", "720p"],
      },
    ]),
    [
      {
        FileId: "file-001",
        Resolution: ["360p", "720p"],
      },
    ]
  );
});

test("restores objects nested inside nested arrays", () => {
  const param = {
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Resolution: {
            type: "array",
            items: {
              type: "object",
              properties: { id: { type: "string" } },
            },
          },
        },
      },
    },
  };

  assert.deepEqual(
    restoreParameterValue(param, [{ Resolution: [{ id: "resolution-id" }] }]),
    [{ Resolution: [{ id: "resolution-id" }] }]
  );
});

test("removes empty nested values while preserving zero and false", () => {
  const schema = {
    type: "object",
    properties: {
      Count: { type: "number" },
      Enabled: { type: "boolean" },
      Empty: { type: "string" },
      Children: {
        type: "array",
        items: {
          type: "object",
          properties: { id: { type: "string" } },
        },
      },
    },
  };

  assert.deepEqual(
    sanitizeParameterValue(schema, {
      Count: 0,
      Enabled: false,
      Empty: "",
      Children: [{ id: "" }],
      Unknown: "ignored",
    }),
    { Count: "0", Enabled: "false" }
  );
});
