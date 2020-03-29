import { Status } from '@jira/models/lib/Status'
import { Ticket } from '@jira/models/lib/Ticket'

export class TicketService {
  private database: Ticket[] = [
    {
      id: '1',
      title: 'Ticket 1',
      description: 'Ceci est un test',
      status: randomStatus(),
    },
    {
      id: '2',
      title: 'Ticket 2',
      description: 'Ceci est un test',
      status: randomStatus(),
    },
    {
      id: '3',
      title: 'Ticket 3',
      description: 'Ceci est un test',
      status: randomStatus(),
    },
  ]

  constructor() {}

  getTicket(id: string): Promise<Ticket | undefined> {
    return Promise.resolve(this.database.find((_) => _.id === id))
  }

  createTicket(newTicket: Ticket): Promise<void> {
    this.database = [...this.database, newTicket]
    return Promise.resolve()
  }
}

const randomStatus = () => status[Math.floor(Math.random() * status.length)]

const status: Status[] = [
  { id: 'A', title: 'A faire', color: '#4968A6' },
  { id: 'A', title: 'En cours', color: '#F2C53D' },
  { id: 'A', title: 'A valider', color: '#D9843B' },
  { id: 'A', title: 'Terminé', color: '#14A647' },
]
