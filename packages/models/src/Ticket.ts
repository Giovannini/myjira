import * as t from 'io-ts'

export const Ticket = t.type({
  id: t.string,
  title: t.string,
  description: t.string,
  status: t.string,
})
export type Ticket = t.TypeOf<typeof Ticket>
