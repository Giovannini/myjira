import * as ant from 'antd'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

interface Props {
  id: string
  index: number
  title: string
}

export default (props: Props) => (
  <Draggable draggableId={props.id} index={props.index}>
    {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
      <StyledCard
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
        title={props.title}
        isDragging={isDragging}
      >
        <Title>{props.title}</Title>
        <ant.Divider style={{ margin: '16px' }} />
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </StyledCard>
    )}
  </Draggable>
)

const Title = styled.span`
  font-size: 20px;
  font-weight: 500;
`

interface StyledCardProps {
  isDragging: boolean
}
const StyledCard = styled.div`
  width: 100%;
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: StyledCardProps) =>
    props.isDragging ? 'skyblue' : 'white'};

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`
