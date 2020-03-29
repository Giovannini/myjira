import {
  DashboardFilled,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const { Sider } = Layout

const routes = [
  { path: '/', label: 'Home', icon: <HomeFilled /> },
  { path: '/dashboard', label: 'Board', icon: <DashboardFilled /> },
]

export default () => {
  const [state, setState] = React.useState({ collapsed: true })
  const { pathname } = useLocation()
  const selectedKey = routes.findIndex((_) => _.path === pathname)

  return (
    <SideLayout>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <StyledMenu mode="inline" defaultSelectedKeys={[`${selectedKey}`]}>
          {routes.map(({ icon, label, path }, i) => (
            <Menu.Item key={`${i}`}>
              <Link to={path}>
                {icon}
                <span>{label}</span>
              </Link>
            </Menu.Item>
          ))}
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
