import { RequestHandler } from 'express'
import * as t from 'io-ts'

import { Ticket } from '@jira/models/lib/Ticket'

import { TicketService } from './TicketService'
import { notFound } from '../common/ApiError'
import { withJsonBody, withQueryParams } from '../common/routes'

const ticketService = new TicketService()

// TODO: ask for a ticket without id as input and send it back with generated id
export const createTicket: RequestHandler = withJsonBody(Ticket)(
  async (ticket, _, res) => {
    console.info('Creating ticket')
    await ticketService.createTicket(ticket)
    res.status(201).json(ticket)
  }
)

export const getTicket: RequestHandler = withQueryParams(
  t.type({ id: t.string })
)(async ({ id }, _, res) => {
  console.info(`Lookup ticket '${id}'`)
  const ticket = await ticketService.getTicket(id)
  if (ticket) res.status(200).json(ticket)
  else res.status(404).json(notFound(`ticket with id '${id}'`))
})

export const listTickets: RequestHandler = async (_, res) => {
  console.info('Listing ticket')
  const tickets = await ticketService.listTickets()
  res.status(200).json(tickets)
}
