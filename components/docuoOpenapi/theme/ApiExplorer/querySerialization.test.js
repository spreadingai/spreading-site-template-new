const test = require("node:test");
const assert = require("node:assert/strict");

const { serializeQueryParams } = require("./querySerialization");

test("serializes object arrays as contiguous recursive indexed-dot query keys", () => {
  const result = serializeQueryParams([
    {
      name: "HandleMediaArgs",
      in: "query",
      schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            FileId: { type: "string" },
            StartTime: { type: "number" },
            EndTime: { type: "number" },
          },
        },
      },
      "x-docuo-query-serialization": {
        style: "recursive-indexed-dot",
      },
      value: [
        { FileId: "file-001", StartTime: 0, EndTime: "" },
        { FileId: "file-002", StartTime: 10, EndTime: 20 },
      ],
    },
  ]);

  assert.deepEqual(result, [
    { key: "HandleMediaArgs.0.FileId", value: "file-001" },
    { key: "HandleMediaArgs.0.StartTime", value: "0" },
    { key: "HandleMediaArgs.1.FileId", value: "file-002" },
    { key: "HandleMediaArgs.1.StartTime", value: "10" },
    { key: "HandleMediaArgs.1.EndTime", value: "20" },
  ]);
});

test("honors the configured starting index", () => {
  const result = serializeQueryParams([
    {
      name: "Items",
      in: "query",
      schema: {
        type: "array",
        items: {
          type: "object",
          properties: { Id: { type: "string" } },
        },
      },
      "x-docuo-query-serialization": {
        style: "recursive-indexed-dot",
        indexStart: 1,
      },
      value: [{ Id: "a" }, { Id: "b" }],
    },
  ]);

  assert.deepEqual(result, [
    { key: "Items.1.Id", value: "a" },
    { key: "Items.2.Id", value: "b" },
  ]);
});

test("serializes nested arrays with independent contiguous indexes", () => {
  const result = serializeQueryParams([
    {
      name: "Media",
      in: "query",
      schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            FileId: { type: "string" },
            Resolution: {
              type: "array",
              items: {
                type: "string",
                enum: ["360p", "540p", "720p"],
              },
            },
          },
        },
      },
      "x-docuo-query-serialization": {
        style: "recursive-indexed-dot",
      },
      value: [
        {
          FileId: "5001834814700023699",
          Resolution: ["360p", "720p"],
        },
        { FileId: "5001834814583141985" },
        {
          FileId: "5001834814648245073",
          Resolution: ["360p", "540p"],
        },
      ],
    },
  ]);

  assert.deepEqual(result, [
    { key: "Media.0.FileId", value: "5001834814700023699" },
    { key: "Media.0.Resolution.0", value: "360p" },
    { key: "Media.0.Resolution.1", value: "720p" },
    { key: "Media.1.FileId", value: "5001834814583141985" },
    { key: "Media.2.FileId", value: "5001834814648245073" },
    { key: "Media.2.Resolution.0", value: "360p" },
    { key: "Media.2.Resolution.1", value: "540p" },
  ]);
});

test("serializes objects nested inside nested arrays", () => {
  const result = serializeQueryParams([
    {
      name: "Media",
      in: "query",
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
      "x-docuo-query-serialization": {
        style: "recursive-indexed-dot",
      },
      value: [{ Resolution: [{ id: "resolution-id" }] }],
    },
  ]);

  assert.deepEqual(result, [
    { key: "Media.0.Resolution.0.id", value: "resolution-id" },
  ]);
});

test("preserves existing bracket-array serialization", () => {
  const result = serializeQueryParams([
    {
      name: "InputFileId",
      in: "query",
      schema: { type: "array", items: { type: "string" } },
      value: ["file-001", "file-002"],
    },
  ]);

  assert.deepEqual(result, [
    { key: "InputFileId[]", value: "file-001" },
    { key: "InputFileId[]", value: "file-002" },
  ]);
});

test("preserves empty boolean flags and scalar parameters", () => {
  const result = serializeQueryParams([
    {
      name: "DryRun",
      in: "query",
      allowEmptyValue: true,
      schema: { type: "boolean" },
      value: "true",
    },
    {
      name: "Vendor",
      in: "query",
      schema: { type: "string" },
      value: "Tencent",
    },
  ]);

  assert.deepEqual(result, [
    { key: "DryRun", value: null },
    { key: "Vendor", value: "Tencent" },
  ]);
});
