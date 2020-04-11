import { Ticket } from '@jira/models/lib/Ticket'

import { randomStatus } from '../status/StatusRepository'

export default class TicketRepository {
  private database: Ticket[] = Array(6)
    .fill(0)
    .map((_, i) => ({
      id: `${i}`,
      title: `Ticket ${i}`,
      description: 'Ceci est un test',
      status: randomStatus(),
    }))

  constructor() {}

  lookup(id: string): Promise<Ticket | undefined> {
    return Promise.resolve(this.database.find((_) => _.id === id))
  }

  update(id: string, newTicket: Ticket): Promise<boolean> {
    let hasBeenFound = false
    this.database = this.database.map((ticket) => {
      if (ticket.id === id) {
        hasBeenFound = true
        return newTicket
      } else return ticket
    })
    console.log('hasBeenFound', hasBeenFound)
    return Promise.resolve(hasBeenFound)
  }

  list(): Promise<Ticket[]> {
    return Promise.resolve(this.database)
  }

  create(newTicket: Omit<Ticket, 'id'>): Promise<void> {
    this.database = [
      ...this.database,
      { ...newTicket, id: `${this.database.length}` },
    ]
    return Promise.resolve()
  }
}
