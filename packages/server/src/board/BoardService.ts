import { ApiBoard, ApiColumn } from '@jira/models/lib/Board'
import { Status } from '@jira/models/lib/Status'
import { Ticket } from '@jira/models/lib/Ticket'

import { Board } from './models'
import BoardRepository from './BoardRepository'
import StatusRepository from '../status/StatusRepository'
import TicketRepository from '../ticket/TicketRepository'

export default class BoardService {
  private boardRepository: BoardRepository
  private statusService: StatusRepository
  private ticketRepository: TicketRepository

  constructor(
    boardRepository: BoardRepository,
    statusService: StatusRepository,
    ticketRepository: TicketRepository
  ) {
    this.boardRepository = boardRepository
    this.statusService = statusService
    this.ticketRepository = ticketRepository
  }

  getApiBoard = async (id: string): Promise<ApiBoard | undefined> => {
    const board: Board | undefined = await this.boardRepository.lookup(id)
    if (board !== undefined) {
      const tasks: Ticket[] = (
        await Promise.all(
          board.tasks.map((id) => this.ticketRepository.lookup(id))
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
      const columns: ApiColumn[] = status.map((s) => ({
        id: s.id,
        title: s.title,
        tasks: tasks.filter((_) => _.status === s.id).map((_) => _.id),
      }))
      return {
        id: board.id,
        tasks,
        columns,
        columnOrder: board.columnOrder,
      }
    } else return undefined
  }
}
