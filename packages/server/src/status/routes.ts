import { RequestHandler } from 'express'
import * as t from 'io-ts'

import { StatusService } from './StatusService'
import { notFound } from '../common/ApiError'
import { withQueryParams } from '../common/routes'

const statusService = new StatusService()

export const getStatus: RequestHandler = withQueryParams(
  t.type({ id: t.string })
)(async ({ id }, _, res) => {
  console.info(`Lookup status '${id}'`)
  const status = await statusService.lookup(id)
  if (status) res.status(200).json(status)
  else res.status(404).json(notFound(`Status with id '${id}'`))
})
