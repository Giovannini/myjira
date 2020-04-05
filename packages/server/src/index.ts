import bodyParser from 'body-parser'
import express from 'express'

import { getBoard } from './board/routes'
import { createTicket, getTicket, listTickets } from './ticket/routes'

const port = 8080
const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})

app.get('/', async (req, res, next) => {
  res.status(200).send('Hello world!')
})

app.get('/board/:id', getBoard)

app.get('/tickets', listTickets)
app.get('/ticket/:id', getTicket)
app.put('/ticket', createTicket)

console.info(`Listening on port ${port}`)
app.listen(port)
