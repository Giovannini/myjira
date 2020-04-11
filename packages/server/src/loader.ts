import BoardRepository from './board/BoardRepository'
import BoardService from './board/BoardService'
import StatusRepository from './status/StatusRepository'
import StatusService from './status/StatusService'
import TicketRepository from './ticket/TicketRepository'
import TicketService from './ticket/TicketService'

const boardRepository = new BoardRepository()
const statusRepository = new StatusRepository()
const ticketRepository = new TicketRepository()

export const repositories = {
  board: boardRepository,
  status: statusRepository,
  ticket: ticketRepository,
}

const boardService = new BoardService(
  boardRepository,
  statusRepository,
  ticketRepository
)
const statusService = new StatusService(statusRepository)
const ticketService = new TicketService(ticketRepository)

export const services = {
  board: boardService,
  status: statusService,
  ticket: ticketService,
}
