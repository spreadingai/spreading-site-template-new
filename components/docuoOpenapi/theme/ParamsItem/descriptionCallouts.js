function normalizeDescriptionCallouts(description) {
  if (!description) return description;

  return description
    .replace(
      /<Warning(?:\s+title="([^"]*)")?\s*>/g,
      (_, title) =>
        `<div data-docuo-callout="warning" data-title="${title || "注意"}">`
    )
    .replace(/<\/Warning>/g, "</div>");
}

module.exports = { normalizeDescriptionCallouts };
