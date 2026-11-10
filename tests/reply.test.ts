import { test, expect } from 'claude-code/testing'

test('reply renders with custom markdown', async ($, on) => {
  on('ui.render', { component: 'AssistantMessage' }, ($: any, e: any, next: any) => next(e))
  const tree = await $.ui.render({
    surface: 'terminal', component: 'AssistantMessage', requestId: 'm1',
    props: { text: '### Head\n\nUse `foo()` and **bold**.\n\n- item', isFirstOfReply: true },
  } as any)
  expect(JSON.stringify(tree)).toContain('#e0a458')
})
