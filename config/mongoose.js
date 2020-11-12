const mongoose = require('mongoose')
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection

db.on('error', () => {
  console.error('Could not connect')
})

db.once('open', () => {
  console.log('connect success')
})

module.exports = db
