import React, { useState } from 'react'
import * as dnd from 'react-beautiful-dnd'
import styled from 'styled-components'

import { ApiBoard, ApiColumn } from '@jira/models/lib/Board'

import Column from './Column'

interface Props {
  initialData: ApiBoard
}

export default ({ initialData }: Props) => {
  const [state, setState] = useState(initialData)

  const moveTaskInDifferentColumn = (
    srceColumn: ApiColumn,
    destColumn: ApiColumn,
    sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => {
    const newSrcTaskIds = Array.from(srceColumn.tasks)
    newSrcTaskIds.splice(sourceIndex, 1)
    const newDstTaskIds = Array.from(destColumn.tasks)
    newDstTaskIds.splice(destinationIndex, 0, draggableId)
    setState((oldState) => ({
      ...oldState,
      columns: oldState.columns.map((column) => {
        if (column.id === srceColumn.id)
          return { ...column, tasks: newSrcTaskIds }
        if (column.id === destColumn.id)
          return { ...column, tasks: newDstTaskIds }
        else return column
      }),
    }))
  }

  const moveTaskInSameColumn = (
    column: ApiColumn,
    sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => {
    const newTaskIds = Array.from(column.tasks)
    newTaskIds.splice(sourceIndex, 1)
    newTaskIds.splice(destinationIndex, 0, draggableId)
    const newColumn = { ...column, tasks: newTaskIds }
    setState((oldState) => ({
      ...oldState,
      columns: oldState.columns.map((column) => {
        if (column.id === newColumn.id) return newColumn
        else return column
      }),
    }))
  }

  const moveColumn = (
    sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => {
    const newColumnOrder = Array.from(state.columnOrder)
    newColumnOrder.splice(sourceIndex, 1)
    newColumnOrder.splice(destinationIndex, 0, draggableId)
    setState((oldState) => ({
      ...oldState,
      columnOrder: newColumnOrder,
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

    // if (type === 'column') {
    //   moveColumn(source.index, destination.index, draggableId)
    //   return
    // }

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
  )
}

const InternalBoard = styled.div`
  display: flex;
`
