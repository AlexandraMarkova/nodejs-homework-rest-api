require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.URL_DB

const db = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.massage}`)
  process.exit(1)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected')
    process.exit(1)
  })
})

module.exports = db
