import * as t from 'io-ts'

import { Ticket } from './Ticket'

export const ApiColumn = t.type({
  id: t.string,
  title: t.string,
  tasks: t.array(t.string),
})
export type ApiColumn = t.TypeOf<typeof ApiColumn>

export const ApiBoard = t.type({
  id: t.string,
  tasks: t.array(Ticket),
  columns: t.array(ApiColumn),
  columnOrder: t.array(t.string),
})
export type ApiBoard = t.TypeOf<typeof ApiBoard>
