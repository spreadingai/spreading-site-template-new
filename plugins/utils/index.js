export const flowElementType = "mdxJsxFlowElement";

export function isElement(node, key = "type", element = "element") {
  return node != undefined && node[key] === element;
}

export const parseHeadingsToTocs = (headings) => {
  const list = [...headings].map((val, i) => {
    val.index = i;
    return val;
  });
  const ret = [];

  list.forEach((heading, index) => {
    const prev = list[index - 1];

    if (!prev) {
      ret.push(heading);
    } else {
      if (prev.level < heading.level) {
        heading.parent = {
          id: prev.id,
          level: prev.level,
          index: prev.index,
        };
        prev.children = prev.children || [];
        prev.children.push(heading);
      } else {
        let parent = prev.parent;

        let shouldContinue = true;

        while (shouldContinue) {
          if (!parent) {
            shouldContinue = false;
            ret.push(heading);
          } else if (parent.level < heading.level) {
            heading.parent = parent;
            list[parent.index].children = list[parent.index].children || [];
            list[parent.index].children.push(heading);
            shouldContinue = false;
          } else {
            parent = list[parent.index].parent;
          }
        }
      }
    }
  });

  return ret;
};