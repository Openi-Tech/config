import { definePlugin, defineRule } from '@oxlint/plugins'

const noClasses = defineRule({
  meta: {
    type: 'problem',
    docs: {
      description: 'Plain consts and free functions instead of classes.',
    },
    messages: { noClass: 'Use plain consts and free functions, not classes.' },
  },
  createOnce(context) {
    /** @param {import('@oxlint/plugins').Node} node */
    const report = node => context.report({ node, messageId: 'noClass' })
    return { ClassDeclaration: report, ClassExpression: report }
  },
})

const noConditionalAwaitFallback = defineRule({
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'No `cond ? await x : []` ternaries; branch with an early return or a guard clause.',
    },
    messages: {
      noTernary:
        'Avoid `cond ? await x : <fallback>`; use an early return or a guard clause.',
    },
  },
  createOnce(context) {
    return {
      ConditionalExpression(node) {
        const branches = [node.consequent, node.alternate]
        const hasAwait = branches.some(b => b.type === 'AwaitExpression')
        const hasEmpty = branches.some(
          b =>
            (b.type === 'ArrayExpression' && b.elements.length === 0) ||
            (b.type === 'Literal' && b.value === null) ||
            (b.type === 'Identifier' && b.name === 'undefined'),
        )
        if (hasAwait && hasEmpty)
          context.report({ node, messageId: 'noTernary' })
      },
    }
  },
})

export default definePlugin({
  meta: { name: 'openi' },
  rules: {
    'no-classes': noClasses,
    'no-conditional-await-fallback': noConditionalAwaitFallback,
  },
})
