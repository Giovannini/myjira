import bodyParser from 'body-parser'
import express from 'express'

import { services } from './loader'

import boardRoutes from './board/routes'
import ticketRoutes from './ticket/routes'

const port = 8080
const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT')
  next()
})

app.get('/', async (req, res, next) => {
  res.status(200).send('Hello world!')
})

boardRoutes(services.board)(app, 'board')
ticketRoutes(services.ticket)(app, 'ticket')

console.info(`Listening on port ${port}`)
app.listen(port)
