import * as t from 'io-ts'

import { Status } from './Status'

export const Ticket = t.type({
  id: t.string,
  title: t.string,
  description: t.string,
  status: Status,
})
export type Ticket = t.TypeOf<typeof Ticket>
