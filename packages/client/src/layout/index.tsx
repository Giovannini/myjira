import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Side from './Side'

import * as colors from '../common/primitives/colors'

const { Content } = Layout

interface Props {
  children: React.ReactNode
}

export default (props: Props) => (
  <AppLayout>
    <Header />
    <Layout>
      <Side />
      <Layout
        style={{
          padding: '0 24px 24px',
          marginLeft: '80px',
          background: `${colors.secondary}44`,
        }}
      >
        <AppContent>{props.children}</AppContent>
      </Layout>
    </Layout>
  </AppLayout>
)

const AppLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`

const AppContent = styled(Content)`
  padding: 24px;
  margin-left: 80px;
  height: 100%;
`
