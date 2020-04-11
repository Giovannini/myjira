import { Response } from 'express'

import * as t from 'io-ts'

export interface ApiError {
  status: number
  message?: string
  devMessage?: string
}

export const errorResponse = (res: Response, error: ApiError) => {
  res.status(error.status).json(error)
}

export const apiErrorFrom = (errors: t.Errors, message?: string): ApiError => ({
  status: 400,
  message,
  devMessage: JSON.stringify(errors),
})

export const notFound = (resource: string): ApiError => ({
  status: 404,
  message: `Resource ${resource} not found`,
})
