import { Ticket } from '@jira/models/lib/Ticket'

import { randomStatus } from '../status/StatusService'

export class TicketService {
  private database: Ticket[] = Array(6)
    .fill(0)
    .map((_, i) => ({
      id: `${i}`,
      title: `Ticket ${i}`,
      description: 'Ceci est un test',
      status: randomStatus(),
    }))

  constructor() {}

  getTicket(id: string): Promise<Ticket | undefined> {
    return Promise.resolve(this.database.find((_) => _.id === id))
  }

  listTickets(): Promise<Ticket[]> {
    return Promise.resolve(this.database)
  }

  createTicket(newTicket: Ticket): Promise<void> {
    this.database = [...this.database, newTicket]
    return Promise.resolve()
  }
}
