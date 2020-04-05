import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './layout/index'
import Board from './views/board/index'
import 'antd/dist/antd.css'

export default () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/dashboard">
          <Board />
        </Route>
        <Route path="/">Home</Route>
      </Switch>
    </Layout>
  </Router>
)
