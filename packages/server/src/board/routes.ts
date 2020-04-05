import { RequestHandler } from 'express'
import * as t from 'io-ts'

import { BoardService } from './BoardService'
import { notFound } from '../common/ApiError'
import { withQueryParams } from '../common/routes'
import { StatusService } from '../status/StatusService'
import { TicketService } from '../ticket/TicketService'

const statusService = new StatusService()
const ticketService = new TicketService()
const boardService = new BoardService(statusService, ticketService)

export const getBoard: RequestHandler = withQueryParams(
  t.type({ id: t.string })
)(async ({ id }, _, res) => {
  console.info(`Lookup board '${id}'`)
  const board = await boardService.lookup(id)
  if (board) res.status(200).json(board)
  else res.status(404).json(notFound(`Board with id '${id}'`))
})
