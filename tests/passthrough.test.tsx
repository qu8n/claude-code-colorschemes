import { test, expect } from 'claude-code/testing'

test('reply passes the render on with empty text and keeps what comes back', async ($, on) => {
  let seen: string | undefined
  on('ui.render', { component: 'AssistantMessage' }, ($, e) => {
    seen = e.props.text
    const { Text } = $.ui.resolve(e)
    return <Text>AD-MARKER</Text>
  })
  const tree = await $.ui.render({
    surface: 'terminal', component: 'AssistantMessage', requestId: 'm1',
    props: { text: 'Hello **there**', isFirstOfReply: true },
  } as any)
  const out = JSON.stringify(tree)
  expect(seen).toBe('')
  expect(out).toContain('AD-MARKER')
  expect(out).toContain('there')
})
