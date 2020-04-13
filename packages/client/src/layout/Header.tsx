import { Layout, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'

import * as colors from '../common/primitives/colors'
import logo from '../rudder.svg'

export default () => (
  <Header>
    <Space size="large">
      <img src={logo} alt="logo" style={{ height: '50px' }} />
      <Title>My JIRA</Title>
    </Space>
  </Header>
)

const Header = styled(Layout.Header)`
  display: flex;
  align-items: center;
  background-color: ${colors.primary};
`

const Title = styled.h1`
  margin: 0;
  color: white;
`
