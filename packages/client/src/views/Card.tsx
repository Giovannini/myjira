import { Card } from 'antd'
import React from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface CardProps {
  title: string
}
export default (props: CardProps) => (
  <StyledCard title={props.title} style={{ width: 300 }}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </StyledCard>
)

const StyledCard = styled(Card)`
  width: 300px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`
