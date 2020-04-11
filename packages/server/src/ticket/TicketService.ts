import { Ticket } from '@jira/models/lib/Ticket'

import TicketRepository from './TicketRepository'

export default class TicketService {
  private repository: TicketRepository

  constructor(repository: TicketRepository) {
    this.repository = repository
  }

  getTicket(id: string): Promise<Ticket | undefined> {
    return this.repository.lookup(id)
  }

  async updateTicketStatus(id: string, newStatusId: string): Promise<boolean> {
    const ticket = await this.getTicket(id)
    console.log(ticket)
    if (!!ticket) {
      return this.repository.update(id, { ...ticket, status: newStatusId })
    } else {
      return Promise.resolve(false)
    }
  }

  listTickets(): Promise<Ticket[]> {
    return this.repository.list()
  }

  createTicket(newTicket: Omit<Ticket, 'id'>): Promise<void> {
    return this.repository.create(newTicket)
  }
}
