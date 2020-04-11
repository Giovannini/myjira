import { Request, RequestHandler, Response } from 'express'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import * as t from 'io-ts'

import { ApiError, apiErrorFrom, errorResponse } from './ApiError'

export const extract = <Q, B>(
  query: t.Decoder<unknown, Q>,
  body: t.Decoder<unknown, B>
) => (
  content: (query: Q, body: B, req: Request, res: Response) => Promise<void>
): RequestHandler => (req, res, _) => {
  return pipe(
    handle('query parameters', query, req.params),
    E.chain((query) =>
      pipe(
        handle('body', body, req.body),
        E.map((body) => ({ body, query }))
      )
    ),
    E.bimap(
      (apiError) => errorResponse(res, apiError),
      ({ body, query }) => content(query, body, req, res)
    )
  )
}

const handle = <A>(
  name: string,
  decoder: t.Decoder<unknown, A>,
  input: unknown
): E.Either<ApiError, A> => {
  return pipe(
    decoder.decode(input),
    E.bimap(
      (_) => apiErrorFrom(_, `Invalid ${name} received`),
      (_) => _
    )
  )
}

export const withJsonBody = <A>(decoder: t.Decoder<unknown, A>) => (
  content: (body: A, req: Request, res: Response) => Promise<void>
): RequestHandler => (req, res, _) => {
  pipe(
    handle('body', decoder, req.body),
    E.fold(
      (apiError) => errorResponse(res, apiError),
      (a) => content(a, req, res)
    )
  )
}

export const withQueryParams = <A>(decoder: t.Decoder<unknown, A>) => (
  content: (params: A, req: Request, res: Response) => Promise<void>
): RequestHandler => (req, res, _) => {
  pipe(
    handle('query parameters', decoder, req.params),
    E.fold(
      (apiError) => errorResponse(res, apiError),
      (a) => content(a, req, res)
    )
  )
}
