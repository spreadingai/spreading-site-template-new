const test = require("node:test");
const assert = require("node:assert/strict");

const { normalizeDescriptionCallouts } = require("./descriptionCallouts");

test("converts Warning tags into block-level callout containers", () => {
  assert.equal(
    normalizeDescriptionCallouts(
      '<Warning title="注意">N 必须从 0 开始。</Warning>'
    ),
    '<div data-docuo-callout="warning" data-title="注意">N 必须从 0 开始。</div>'
  );
});

test("leaves descriptions without Warning tags unchanged", () => {
  assert.equal(
    normalizeDescriptionCallouts("普通参数说明。"),
    "普通参数说明。"
  );
});
