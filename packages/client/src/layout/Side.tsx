import {
  DashboardFilled,
  HomeFilled,
  CaretLeftOutlined,
  CaretRightOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import * as colors from '../common/primitives/colors'

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
      <StyledSider trigger={null} collapsible collapsed={state.collapsed}>
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
      </StyledSider>
      <ExpandButtonContainer>
        {state.collapsed ? (
          <CaretRightOutlined
            style={{ fontSize: '30px', color: colors.primary }}
            onClick={() => setState({ collapsed: !state.collapsed })}
          />
        ) : (
          <CaretLeftOutlined
            style={{ fontSize: '30px', color: colors.primary }}
            onClick={() => setState({ collapsed: !state.collapsed })}
          />
        )}
      </ExpandButtonContainer>
    </SideLayout>
  )
}

const ExpandButtonContainer = styled.div`
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -20px;
  z-index: 1;
`

const SideLayout = styled(Layout)`
  display: flex;
  align-items: center;
  height: 100%;
  position: fixed;
  background: transparent;
`

const StyledSider = styled(Sider)`
  height: 100%;
`

const StyledMenu = styled(Menu)`
  height: 100%;
  borderright: 0;
`
