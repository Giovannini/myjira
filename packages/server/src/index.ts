import bodyParser from 'body-parser'
import express from 'express'

import { createTicket, getTicket } from './ticket/routes'

const port = 8080
const app = express()
app.use(bodyParser.json())

app.get('/', async (req, res, next) => {
  res.status(200).send('Hello world!')
})

app.get('/ticket/:id', getTicket)
app.put('/ticket', createTicket)

console.info(`Listening on port ${port}`)
app.listen(port)
