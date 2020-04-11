import { Express, RequestHandler } from 'express'
import * as t from 'io-ts'

import BoardService from './BoardService'
import { notFound } from '../common/ApiError'
import { withQueryParams } from '../common/routes'

export default (boardService: BoardService) => (
  app: Express,
  resourceName: string
) => {
  app.get(`/${resourceName}/:id`, getBoard(boardService))
}

const getBoard = (boardService: BoardService): RequestHandler =>
  withQueryParams(t.type({ id: t.string }))(async ({ id }, _, res) => {
    console.info(`Lookup board '${id}'`)
    const board = await boardService.getApiBoard(id)
    if (board !== undefined) {
      res.status(200).json(board)
    } else res.status(404).json(notFound(`Board with id '${id}'`))
  })
