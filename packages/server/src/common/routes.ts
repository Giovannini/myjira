import { Request, RequestHandler, Response } from 'express'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import * as t from 'io-ts'

import { apiErrorFrom, errorResponse } from './ApiError'

export const withJsonBody = <A>(decoder: t.Decoder<unknown, A>) => (
  content: (body: A, req: Request, res: Response) => Promise<void>
): RequestHandler => (req, res, _) => {
  pipe(
    decoder.decode(req.body),
    E.fold(
      (errors) =>
        errorResponse(res, apiErrorFrom(errors, 'Invalid body received')),
      (a) => content(a, req, res)
    )
  )
}

export const withQueryParams = <A>(decoder: t.Decoder<unknown, A>) => (
  content: (params: A, req: Request, res: Response) => Promise<void>
): RequestHandler => (req, res, _) => {
  pipe(
    decoder.decode(req.params),
    E.fold(
      (errors) =>
        errorResponse(
          res,
          apiErrorFrom(errors, 'Invalid query parameters received')
        ),
      (a) => content(a, req, res)
    )
  )
}
