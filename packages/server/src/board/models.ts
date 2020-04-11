import * as t from 'io-ts'

export const Board = t.type({
  id: t.string,
  tasks: t.array(t.string),
  columns: t.array(t.string),
  columnOrder: t.array(t.string),
})
export type Board = t.TypeOf<typeof Board>
