const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const UsersRouter = require('./src/routes/api/users')
const contactsRouter = require('./src/routes/api/contacts')
const filesRouter = require('./src/routes/api/files')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', UsersRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/users', filesRouter)

const { HttpCode } = require('./src/helpers/constants')

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: 'Not Found',
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR

  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  })
})

module.exports = app
