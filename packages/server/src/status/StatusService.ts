import { Status } from '@jira/models/lib/Status'

export class StatusService {
  private database: Status[] = status

  constructor() {}

  lookup(id: string): Promise<Status | undefined> {
    return Promise.resolve(this.database.find((_) => _.id === id))
  }

  list(): Promise<Status[]> {
    return Promise.resolve(this.database)
  }
}

export const randomStatus = () =>
  status[Math.floor(Math.random() * status.length)]

const status: Status[] = [
  { id: 'A', title: 'A faire', color: '#4968A6' },
  { id: 'B', title: 'En cours', color: '#F2C53D' },
  { id: 'C', title: 'A valider', color: '#D9843B' },
  { id: 'D', title: 'Terminé', color: '#14A647' },
]
