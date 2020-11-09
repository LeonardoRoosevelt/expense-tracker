// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//server and database
const app = express()
require('./config/mongoose')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

// Set middlewares
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// routes setting
app.use(routes)
// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})
