const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const productRouter = require('./routes/api/products')
const { errorHandler } = require('./helpers/apiHelpers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/products', productRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app