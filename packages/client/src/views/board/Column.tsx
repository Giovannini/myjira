import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Card from './Card'
import * as colors from '../../common/primitives/colors'

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
          {placeholder && snapshot.isDraggingOver && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: `3px dashed ${colors.primary}`,
                borderRadius: 5,
              }}
            />
          )}
        </TaskList>
      )}
    </Droppable>
  </InternalColumn>
)

const Title = styled.h3`
  font-size: 16px;
`

interface TaskListProps {
  isDraggingOver: boolean
}
const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${(props: TaskListProps) =>
    props.isDraggingOver ? `${colors.secondary}88` : 'inherit'};
`

const InternalColumn = styled.div`
  position: relative;
  background: #eee;
  width: 300px;
  margin: 8px;
  padding: 4px;
  display: flex;
  flex-direction: column;
`
