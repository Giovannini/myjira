import { Express, RequestHandler } from 'express'
import * as t from 'io-ts'

import { Ticket } from '@jira/models/lib/Ticket'

import TicketService from './TicketService'
import { notFound } from '../common/ApiError'
import { extract, withJsonBody, withQueryParams } from '../common/routes'

export default (ticketService: TicketService) => (
  app: Express,
  resourceName: string
) => {
  app.get(`/${resourceName}s`, listTickets(ticketService))
  app.get(`/${resourceName}/:id`, getTicket(ticketService))
  app.post(`/${resourceName}/create`, createTicket(ticketService))
  app.options('/ticket/:id/status', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200).end()
  })
  app.put('/ticket/:id/status', updateTicketStatus(ticketService))
}

// TODO: ask for a ticket without id as input and send it back with generated id
const createTicket = (ticketService: TicketService): RequestHandler =>
  withJsonBody(Ticket)(async (ticket, _, res) => {
    console.info('Creating ticket')
    await ticketService.createTicket(ticket)
    res.status(201).json(ticket)
  })

const getTicket = (ticketService: TicketService): RequestHandler =>
  withQueryParams(t.type({ id: t.string }))(async ({ id }, _, res) => {
    console.info(`Lookup ticket '${id}'`)
    const ticket = await ticketService.getTicket(id)
    if (ticket) res.status(200).json(ticket)
    else res.status(404).json(notFound(`ticket with id '${id}'`))
  })

const listTickets = (ticketService: TicketService): RequestHandler => async (
  _,
  res
) => {
  console.info('Listing ticket')
  const tickets = await ticketService.listTickets()
  res.status(200).json(tickets)
}

const updateTicketStatus = (ticketService: TicketService): RequestHandler =>
  extract(
    t.type({ id: t.string }),
    t.type({ status: t.string })
  )(async ({ id }, { status }, req, res) => {
    console.log(`Updating status of ticket '${id}'`)
    const hasBeenFound = await ticketService.updateTicketStatus(id, status)
    if (hasBeenFound) res.status(204).json()
    else res.status(404).json(notFound(`ticket with id '${id}'`))
  })
