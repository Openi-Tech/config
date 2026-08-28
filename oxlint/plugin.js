import { definePlugin, defineRule } from "@oxlint/plugins";

const noClasses = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Plain consts and free functions instead of classes; Error subclasses are allowed.",
    },
    messages: { noClass: "Use plain consts and free functions, not classes." },
  },
  createOnce(context) {
    /** @param {import('@oxlint/plugins').ESTree.Class} node */
    const report = (node) => {
      const parent = node.superClass;
      const extendsError =
        parent &&
        ((parent.type === "Identifier" && parent.name.endsWith("Error")) ||
          (parent.type === "MemberExpression" &&
            parent.property.type === "Identifier" &&
            parent.property.name.endsWith("Error")));
      if (!extendsError) context.report({ node, messageId: "noClass" });
    };
    return { ClassDeclaration: report, ClassExpression: report };
  },
});

const noConditionalAwaitFallback = defineRule({
  meta: {
    type: "suggestion",
    docs: {
      description:
        "No `cond ? await x : []` ternaries; branch with an early return or a guard clause.",
    },
    messages: {
      noTernary: "Avoid `cond ? await x : <fallback>`; use an early return or a guard clause.",
    },
  },
  createOnce(context) {
    return {
      ConditionalExpression(node) {
        const branches = [node.consequent, node.alternate];
        const hasAwait = branches.some((b) => b.type === "AwaitExpression");
        const hasEmpty = branches.some(
          (b) =>
            (b.type === "ArrayExpression" && b.elements.length === 0) ||
            (b.type === "Literal" && b.value === null) ||
            (b.type === "Identifier" && b.name === "undefined"),
        );
        if (hasAwait && hasEmpty) context.report({ node, messageId: "noTernary" });
      },
    };
  },
});

export default definePlugin({
  meta: { name: "openi" },
  rules: {
    "no-classes": noClasses,
    "no-conditional-await-fallback": noConditionalAwaitFallback,
  },
});
