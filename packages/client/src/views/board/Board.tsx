import React, { useState } from 'react'
import * as dnd from 'react-beautiful-dnd'
import styled from 'styled-components'

import { ApiBoard, ApiColumn } from '@jira/models/lib/Board'

import Column from './Column'
import easterBunny from './easter_bunny.svg'
import { updateTicketStatus } from './service'

interface Props {
  initialData: ApiBoard
}

export default ({ initialData }: Props) => {
  const [state, setState] = useState(initialData)

  const handleTicketStatusUpdate = (
    ticketId: string,
    statusId: string,
    previousState: ApiBoard
  ) => {
    updateTicketStatus(ticketId, statusId).then(
      () => {
        console.info(`Ticket ${ticketId} status was successfully updated.`)
      },
      (error: unknown) => {
        console.warn(
          `An error occured updating ticket '${ticketId}' status`,
          error
        )
        console.info('Reverting to previous state')
        setState(previousState)
      }
    )
  }

  const moveTaskInDifferentColumn = (
    srceColumn: ApiColumn,
    destColumn: ApiColumn,
    sourceIndex: number,
    destinationIndex: number,
    ticketId: string // draggableId
  ) => {
    const updateFunction = changeTaskColumnUF(
      srceColumn,
      destColumn,
      sourceIndex,
      destinationIndex,
      ticketId
    )
    setState((oldState) => {
      handleTicketStatusUpdate(ticketId, destColumn.id, oldState)
      return {
        ...oldState,
        columns: updateFunction(oldState.columns),
      }
    })
  }

  const moveTaskInSameColumn = (
    column: ApiColumn,
    sourceIndex: number,
    destinationIndex: number,
    ticketId: string
  ) => {
    // Ticket order is not save in database for now
    const newTaskIds = Array.from(column.tasks)
    newTaskIds.splice(sourceIndex, 1)
    newTaskIds.splice(destinationIndex, 0, ticketId)
    const newColumn = { ...column, tasks: newTaskIds }
    setState((oldState) => ({
      ...oldState,
      columns: oldState.columns.map((column) => {
        if (column.id === newColumn.id) return newColumn
        else return column
      }),
    }))
  }

  const onDragEnd = (result: dnd.DropResult) => {
    const { destination, source, draggableId, type } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'task') {
      const srceColumn = state.columns.find((_) => _.id === source.droppableId)
      const destColumn = state.columns.find(
        (_) => _.id === destination.droppableId
      )

      if (
        srceColumn === destColumn &&
        srceColumn !== undefined &&
        destColumn !== undefined
      ) {
        // Reorder in same column
        moveTaskInSameColumn(
          srceColumn,
          source.index,
          destination.index,
          draggableId
        )
        return
      } else if (srceColumn !== undefined && destColumn !== undefined) {
        moveTaskInDifferentColumn(
          srceColumn,
          destColumn,
          source.index,
          destination.index,
          draggableId
        )
        return
      }
    }
  }

  return (
    <>
      <div>
        <dnd.DragDropContext onDragEnd={onDragEnd}>
          <InternalBoard>
            {state.columnOrder.map((id, index) => {
              const column = state.columns.find((_) => _.id === id)
              const tasks =
                column?.tasks?.map((id) =>
                  state.tasks.find((_) => _.id === id)
                ) || []
              return (
                column && (
                  <Column
                    {...column}
                    key={column.id}
                    index={index}
                    tasks={tasks}
                  />
                )
              )
            })}
          </InternalBoard>
        </dnd.DragDropContext>
      </div>
      <FunnyImage src={easterBunny} alt="logo" />
    </>
  )
}

const FunnyImage = styled.img`
  height: 150px;
  bottom: 50px;
  right: 50px;
  position: absolute;
`

const InternalBoard = styled.div`
  display: flex;
  width: min-content;
`

const changeTaskColumnUF = (
  srceColumn: ApiColumn,
  destColumn: ApiColumn,
  sourceIndex: number,
  destinationIndex: number,
  ticketId: string
): ((oldColumns: ApiColumn[]) => ApiColumn[]) => {
  const newSrcTaskIds = Array.from(srceColumn.tasks)
  newSrcTaskIds.splice(sourceIndex, 1)
  const newDstTaskIds = Array.from(destColumn.tasks)
  newDstTaskIds.splice(destinationIndex, 0, ticketId)
  return (columns) =>
    columns.map((column) => {
      if (column.id === srceColumn.id)
        return { ...column, tasks: newSrcTaskIds }
      if (column.id === destColumn.id)
        return { ...column, tasks: newDstTaskIds }
      else return column
    })
}
