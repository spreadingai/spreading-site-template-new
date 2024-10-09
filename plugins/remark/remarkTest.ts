import { visit } from "unist-util-visit";
import Markdoc from "@markdoc/markdoc";

// This plugin is an example to turn `::youtube` into iframes.
export const remarkTest = () => {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @param {import('vfile').VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return (tree, file) => {
    visit(tree, (node, i, parent) => {
      // Function	Returns	    Example	                      Description
      // equals	  boolean	    equals($myString, 'test')	    Performs common boolean operation
      // and	    boolean	    and($boolean1, $boolean2)	    Performs common boolean operation
      // or	      boolean	    or($boolean1, $boolean2)	    Performs common boolean operation
      // not	    boolean	    not(or($boolean1, $boolean2))	Performs common boolean operation
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "if") return;
        const children = node.children;
        if (!children || !children.length) return;
        // Parses the expression into normal js syntax
        // eg: equals(and(not(props.a),or(props.b,props.c)),"test")
        let expression = children[0].children[0].value;
        const equalsRegex = /equals\((.*)\,(.*)\)/;
        const andRegex = /and\((.*)\,(.*)\)/;
        const orRegex = /or\((.*)\,(.*)\)/;
        const notRegex = /not\((.*)\)/;

        const equalsMatch = expression.match(equalsRegex);
        if (equalsMatch && equalsMatch[1] && equalsMatch[2]) {
          expression = expression.replace(
            equalsMatch[0],
            `(${equalsMatch[1]}===${equalsMatch[2]})`
          );
        }

        // (and(not(props.a),or(props.b,props.c))==="test")
        const andMatch = expression.match(andRegex);
        if (andMatch && andMatch[1] && andMatch[2]) {
          expression = expression.replace(
            andMatch[0],
            `${andMatch[1]}===true&&${andMatch[2]}===true`
          );
        }

        const orMatch = expression.match(orRegex);
        if (orMatch && orMatch[1] && orMatch[2]) {
          expression = expression.replace(
            orMatch[0],
            `${orMatch[1]}===true||${orMatch[2]}===true`
          );
        }

        const notMatch = expression.match(notRegex);
        if (notMatch && notMatch[1]) {
          expression = expression.replace(
            notMatch[0],
            `(${notMatch[1]}!==true)`
          );
        }
      }
    });
  };
};
