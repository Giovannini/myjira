import React, { useState } from 'react'
import * as dnd from 'react-beautiful-dnd'
import styled from 'styled-components'

import Column from './Column'

interface Column {
  id: string
  title: string
  tasks: string[]
}

interface State {
  tasks: { id: string; title: string }[]
  columns: Column[]
  columnOrder: string[]
}

export default () => {
  const [state, setState] = useState(initialData)

  const moveTaskInDifferentColumn = (
    srceColumn: Column,
    destColumn: Column,
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
    column: Column,
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

const initialData: State = {
  tasks: [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
  ],
  columns: [
    { id: '1', title: 'Todo', tasks: ['1', '2', '3'] },
    { id: '2', title: 'In progress', tasks: ['4'] },
    { id: '3', title: 'Done', tasks: [] },
  ],
  columnOrder: ['1', '2', '3'],
}

const InternalBoard = styled.div`
  display: flex;
`
