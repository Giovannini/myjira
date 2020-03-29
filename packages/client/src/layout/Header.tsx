import React from 'react'
import { Layout } from 'antd'

import logo from '../logo.svg'

const { Header } = Layout

export default () => (
  <Header>
    <img src={logo} alt="logo" style={{ height: '50px' }} />
    <h1>My JIRA</h1>
  </Header>
)
