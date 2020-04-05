import * as t from 'io-ts'

import { ApiBoard, Column } from '@jira/models/lib/Board'
import { Status } from '@jira/models/lib/Status'
import { Ticket } from '@jira/models/lib/Ticket'

import { StatusService } from '../status/StatusService'
import { TicketService } from '../ticket/TicketService'

export const Board = t.type({
  id: t.string,
  tasks: t.array(t.string),
  columns: t.array(t.string),
  columnOrder: t.array(t.string),
})
export type Board = t.TypeOf<typeof Board>

export class BoardService {
  private database: Board[] = [
    {
      id: '1',
      tasks: ['1', '2', '3', '4', '5'],
      columns: ['A', 'B', 'C', 'D'],
      columnOrder: ['A', 'B', 'C', 'D'],
    },
  ]
  private statusService: StatusService
  private ticketService: TicketService

  constructor(statusService: StatusService, ticketService: TicketService) {
    this.statusService = statusService
    this.ticketService = ticketService
  }

  async lookup(id: string): Promise<ApiBoard | undefined> {
    const board = this.database.find((_) => _.id === id)
    if (board === undefined) return undefined
    else {
      const tasks: Ticket[] = (
        await Promise.all(
          board.tasks.map((id) => this.ticketService.getTicket(id))
        )
      ).reduce(
        (acc, _) => (_ === undefined ? acc : [...acc, _]),
        [] as Ticket[]
      )
      const status = (
        await Promise.all(
          board.columns.map((id) => this.statusService.lookup(id))
        )
      ).reduce(
        (acc, _) => (_ === undefined ? acc : [...acc, _]),
        [] as Status[]
      )
      const columns: Column[] = status.map((s) => ({
        id: s.id,
        title: s.title,
        tasks: tasks.filter((_) => _.status.id === s.id).map((_) => _.id),
      }))

      return {
        id: board.id,
        tasks,
        columns,
        columnOrder: board.columnOrder,
      }
    }
  }
}
