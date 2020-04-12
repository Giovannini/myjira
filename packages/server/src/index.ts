import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'

import { services } from './loader'

import boardRoutes from './board/routes'
import ticketRoutes from './ticket/routes'

const port = process.env.PORT || 8080
const app = express()

// API
app.use(bodyParser.json())
app.use('/api/*', (req, res, next) => {
  console.info('Add CORS hearders to request', req.path)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT')
  next()
})

boardRoutes(services.board)(app, '/api/board')
ticketRoutes(services.ticket)(app, '/api/ticket')

// Static
app.use((req, res, next) => {
  console.info('Retrieving static asset at', req.path)
  express.static('public')(req, res, next)
  console.log('Status', res.statusCode)
  console.log('JSON', res.json.toString())
})
app.get('*', (req, res) => {
  console.info('Senfing index.html file to request', req.path)
  res.sendFile(path.resolve('./public/index.html'))
})

app.listen(port)
console.info(`Listening on port ${port}`)
