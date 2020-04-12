import React from 'react'
import { pipe } from 'fp-ts/lib/pipeable'
import { fold } from 'fp-ts/lib/Either'

import { ApiBoard } from '@jira/models/lib/Board'

import { useFetch } from '../../common/hooks/useFetch'
import Board from './Board'
import { baseUrl } from './service'

export default () => {
  const { response, error } = useFetch(`${baseUrl}/api/board/1`)
  if (!response) {
    return <div>Loading...</div>
  }
  if (!!error) {
    return <div>An error occured</div>
  }
  return pipe(
    ApiBoard.decode(response),
    fold(
      (error) => {
        console.warn('An error occured', error)
        return <div>An error occured</div>
      },
      (board) => <Board initialData={board} />
    )
  )
}
