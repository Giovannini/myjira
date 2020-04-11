import { Board } from './models'

export default class BoardRepository {
  private database: Board[] = [
    {
      id: '1',
      tasks: ['1', '2', '3', '4', '5'],
      columns: ['A', 'B', 'C', 'D'],
      columnOrder: ['A', 'B', 'C', 'D'],
    },
  ]

  constructor() {}

  async lookup(id: string): Promise<Board | undefined> {
    return Promise.resolve(this.database.find((_) => _.id === id))
  }
}
