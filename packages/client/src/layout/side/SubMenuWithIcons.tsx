import React from 'react'
import { Menu } from 'antd'

const { SubMenu } = Menu

interface Props {
  id: number
  title: string
  icon?: React.ExoticComponent
  options: string[]
}

export default (props: Props) => (
  <SubMenu
    key={`sub${props.id}`}
    title={
      <span>
        {props.icon}
        {props.title}
      </span>
    }
  >
    {props.options.map((option, i) => (
      <Menu.Item key={i}>{option}</Menu.Item>
    ))}
  </SubMenu>
)
