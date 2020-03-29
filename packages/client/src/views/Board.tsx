import React from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Card from './Card'
import Column from './Column'

export default () => (
  <Board>
    <Column title="To do">
      <Card title="Item 1" />
      <Card title="Item 2" />
      <Card title="Item 3" />
    </Column>
    <Column title="In progress">
      <Card title="Item 4" />
    </Column>
    <Column title="Done">
      <Card title="Item 5" />
      <Card title="Item 6" />
    </Column>
  </Board>
)

const Board = styled('div')`
  display: flex;
`
