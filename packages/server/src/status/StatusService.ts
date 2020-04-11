import { Status } from '@jira/models/lib/Status'

import StatusRepository from './StatusRepository'

export default class StatusService {
  private repository: StatusRepository

  constructor(repository: StatusRepository) {
    this.repository = repository
  }

  lookup(id: string): Promise<Status | undefined> {
    return this.repository.lookup(id)
  }

  list(): Promise<Status[]> {
    return this.repository.list()
  }
}
