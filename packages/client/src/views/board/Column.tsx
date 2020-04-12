import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Card from './Card'

interface Task {
  id: string
  title: string
}

interface Props {
  id: string
  index: number
  title: string
  tasks: (Task | undefined)[]
}

export default (props: Props) => (
  <InternalColumn>
    <h3>{props.title}</h3>
    <Droppable droppableId={props.id} type="task">
      {({ innerRef, placeholder }, snapshot) => (
        <TaskList ref={innerRef} isDraggingOver={snapshot.isDraggingOver}>
          {props.tasks.map(
            (task, index) =>
              task && <Card key={task.id} index={index} {...task} />
          )}
          {placeholder}
        </TaskList>
      )}
    </Droppable>
  </InternalColumn>
)

interface TaskListProps {
  isDraggingOver: boolean
}
const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${(props: TaskListProps) =>
    props.isDraggingOver ? 'skyblue' : 'inherit'};
`

const InternalColumn = styled.div`
  background: #eee;
  width: 300px;
  margin: 8px;
  padding: 4px;
  display: flex;
  flex-direction: column;
`
