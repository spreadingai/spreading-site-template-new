const test = require("node:test");
const assert = require("node:assert/strict");

const {
  formatIndexedDotQueryExample,
  formatParameterExample,
  getParameterDisplayName,
  getRecursiveParameterTree,
  getStructureQualifierSchema,
  getVisibleParameterExamples,
} = require("./parameterDisplay");

const parameter = {
  name: "HandleMediaArgs",
  schema: {
    type: "array",
    items: {
      type: "object",
      required: ["FileId"],
      properties: {
        FileId: { type: "string", description: "媒体文件 ID。" },
        StartTime: { type: "number", default: 0, description: "开始时间。" },
        EndTime: { type: "number", description: "结束时间。" },
      },
    },
  },
  example: [
    { FileId: "file-1", StartTime: 0.5, EndTime: 10.5 },
    { FileId: "file-2", StartTime: 10, EndTime: 15 },
  ],
  "x-docuo-query-serialization": {
    style: "recursive-indexed-dot",
    indexStart: 0,
    indexLabels: ["N"],
  },
};

test("represents object-array fields directly inside an indexed array container", () => {
  assert.deepEqual(getRecursiveParameterTree(parameter), {
    kind: "array",
    name: "HandleMediaArgs",
    path: "HandleMediaArgs",
    required: false,
    schema: parameter.schema,
    indexLabel: "N",
    itemSchema: parameter.schema.items,
    children: [
      {
        kind: "field",
        name: "FileId",
        path: "HandleMediaArgs.N.FileId",
        queryName: "HandleMediaArgs.N.FileId",
        required: true,
        schema: { type: "string", description: "媒体文件 ID。" },
      },
      {
        kind: "field",
        name: "StartTime",
        path: "HandleMediaArgs.N.StartTime",
        queryName: "HandleMediaArgs.N.StartTime",
        required: false,
        schema: { type: "number", default: 0, description: "开始时间。" },
      },
      {
        kind: "field",
        name: "EndTime",
        path: "HandleMediaArgs.N.EndTime",
        queryName: "HandleMediaArgs.N.EndTime",
        required: false,
        schema: { type: "number", description: "结束时间。" },
      },
    ],
  });
});

test("formats object-array examples as readable JSON", () => {
  const formatted = formatParameterExample(parameter.example);

  assert.equal(formatted.language, "json");
  assert.match(formatted.value, /"FileId": "file-1"/);
  assert.doesNotMatch(formatted.value, /\[object Object\]/);
});

test("formats indexed-dot examples as the actual query string", () => {
  assert.equal(
    formatIndexedDotQueryExample(parameter),
    "HandleMediaArgs.0.FileId=file-1&\n" +
      "HandleMediaArgs.0.StartTime=0.5&\n" +
      "HandleMediaArgs.0.EndTime=10.5&\n" +
      "HandleMediaArgs.1.FileId=file-2&\n" +
      "HandleMediaArgs.1.StartTime=10&\n" +
      "HandleMediaArgs.1.EndTime=15"
  );
});

test("keeps nested arrays as indexed containers without artificial item nodes", () => {
  const media = {
    name: "Media",
    schema: {
      type: "array",
      items: {
        type: "object",
        required: ["FileId"],
        properties: {
          FileId: { type: "string", description: "文件 ID。" },
          Resolution: {
            type: "array",
            maxItems: 3,
            uniqueItems: true,
            description: "需要删除的分辨率。",
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
      indexLabels: ["N", "M"],
    },
  };

  assert.deepEqual(getRecursiveParameterTree(media), {
    kind: "array",
    name: "Media",
    path: "Media",
    required: false,
    schema: media.schema,
    indexLabel: "N",
    itemSchema: media.schema.items,
    children: [
      {
        kind: "field",
        name: "FileId",
        path: "Media.N.FileId",
        queryName: "Media.N.FileId",
        required: true,
        schema: { type: "string", description: "文件 ID。" },
      },
      {
        kind: "array",
        name: "Resolution",
        path: "Media.N.Resolution",
        required: false,
        schema: media.schema.items.properties.Resolution,
        indexLabel: "M",
        itemSchema: media.schema.items.properties.Resolution.items,
        queryName: "Media.N.Resolution.M",
        children: [],
      },
    ],
  });
});

test("keeps item enum choices on the array item instead of the container", () => {
  const schema = {
    type: "array",
    maxItems: 3,
    items: { type: "string", enum: ["360p", "540p", "720p"] },
  };

  assert.deepEqual(getStructureQualifierSchema({ kind: "array", schema }), {
    type: "array",
    maxItems: 3,
    items: { type: "string" },
  });
  assert.equal(
    getStructureQualifierSchema({ kind: "field", schema: schema.items }),
    schema.items
  );
});

test("keeps object fields directly inside the nested M array container", () => {
  const media = {
    name: "Media",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          Resolution: {
            type: "array",
            items: {
              type: "object",
              required: ["id"],
              properties: { id: { type: "string" } },
            },
          },
        },
      },
    },
    "x-docuo-query-serialization": {
      style: "recursive-indexed-dot",
      indexLabels: ["N", "M"],
    },
  };

  const tree = getRecursiveParameterTree(media);
  assert.deepEqual(tree.children[0], {
    kind: "array",
    name: "Resolution",
    path: "Media.N.Resolution",
    indexLabel: "M",
    required: false,
    schema: media.schema.items.properties.Resolution,
    itemSchema: media.schema.items.properties.Resolution.items,
    children: [
      {
        kind: "field",
        name: "id",
        path: "Media.N.Resolution.M.id",
        queryName: "Media.N.Resolution.M.id",
        required: true,
        schema: { type: "string" },
      },
    ],
  });
});

test("formats the delete-media N plus M example as query keys", () => {
  const media = {
    name: "Media",
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
    example: [
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
    "x-docuo-query-serialization": {
      style: "recursive-indexed-dot",
      indexLabels: ["N", "M"],
    },
  };

  assert.equal(
    formatIndexedDotQueryExample(media),
    "Media.0.FileId=5001834814700023699&\n" +
      "Media.0.Resolution.0=360p&\n" +
      "Media.0.Resolution.1=720p&\n" +
      "Media.1.FileId=5001834814583141985&\n" +
      "Media.2.FileId=5001834814648245073&\n" +
      "Media.2.Resolution.0=360p&\n" +
      "Media.2.Resolution.1=540p"
  );
});

test("shows only the query example for indexed-dot query parameters", () => {
  assert.deepEqual(getVisibleParameterExamples(parameter), {
    structured: null,
    query:
      "HandleMediaArgs.0.FileId=file-1&\n" +
      "HandleMediaArgs.0.StartTime=0.5&\n" +
      "HandleMediaArgs.0.EndTime=10.5&\n" +
      "HandleMediaArgs.1.FileId=file-2&\n" +
      "HandleMediaArgs.1.StartTime=10&\n" +
      "HandleMediaArgs.1.EndTime=15",
  });
});

test("keeps the structured example when no indexed-dot query example exists", () => {
  assert.deepEqual(
    getVisibleParameterExamples({
      name: "Filters",
      schema: { type: "object" },
      example: { status: "active" },
    }),
    {
      structured: {
        language: "json",
        value: '{\n  "status": "active"\n}',
      },
      query: null,
    }
  );
});

test("uses the documented query name without changing serialization name", () => {
  assert.equal(
    getParameterDisplayName({
      name: "InputFileId",
      "x-docuo-display-name": "InputFileId[]",
    }),
    "InputFileId[]"
  );
  assert.equal(getParameterDisplayName({ name: "Vendor" }), "Vendor");
});
