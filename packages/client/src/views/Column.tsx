import React from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface ColumnProps {
  title: string
  children: React.ReactNode
}

export default (props: ColumnProps) => (
  <Column>
    <h3>{props.title}</h3>
    {props.children}
  </Column>
)

const Column = styled.div`
  background: #eee;
  margin: 8px;
  padding: 4px;
  display: flex;
  flex-direction: column;
`
