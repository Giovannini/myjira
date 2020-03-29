import {
  DashboardFilled,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'

const { Sider } = Layout

export default () => {
  const [state, setState] = React.useState({ collapsed: true })
  return (
    <SideLayout>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <StyledMenu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <HomeFilled />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <DashboardFilled />
            <span>Board</span>
          </Menu.Item>
        </StyledMenu>
      </Sider>
      {state.collapsed ? (
        <MenuUnfoldOutlined
          className="trigger"
          onClick={() => setState({ collapsed: !state.collapsed })}
        />
      ) : (
        <MenuFoldOutlined
          className="trigger"
          onClick={() => setState({ collapsed: !state.collapsed })}
        />
      )}
    </SideLayout>
  )
}

const SideLayout = styled(Layout)`
  height: 100%;
  position: fixed;
`

const StyledMenu = styled(Menu)`
  height: 100%;
  borderright: 0;
`
