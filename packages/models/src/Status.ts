import * as t from 'io-ts'

export const Status = t.type({
  id: t.string,
  title: t.string,
  color: t.string,
})
export type Status = t.TypeOf<typeof Status>
