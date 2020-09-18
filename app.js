// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// handlebars setting
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Category = require('./models/category')
const Record = require('./models/record')
const iconCheck = require('./public/javascript/iconCheck')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
// routes setting
app.get('/', (req, res) => {
  let totalAmount = 0
  let categorysList = []
  Category.find()
    .lean()
    .then(categorys => {
      for (const category of categorys) {
        categorysList.push(category)
      }
      return categorysList
    })
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      for (const record of records) {
        totalAmount += record.price
      }
      return res.render('index', { records, totalAmount, categorysList })
    })
    .catch(err => console.error(err))
})

app.get('/filter/:category', (req, res) => {
  let totalAmount = 0
  let categorysList = []
  let recordList = []
  Category.find()
    .lean()
    .then(categorys => {
      for (const category of categorys) {
        categorysList.push(category)
      }
      return categorysList
    })
  const filter = req.params.category
  Record.find()
    .lean()
    .then(records => {
      for (const record of records) {
        if (record.category === filter) {
          recordList.push(record)
          totalAmount += record.price
        }
      }
      return res.render('index', {
        records: recordList,
        totalAmount,
        categorysList
      })
    })
    .catch(err => console.error(err))
})

app.get('/records/newCategory', (req, res) => {
  return res.render('newCategory')
})

app.post('/categorys', (req, res) => {
  const category = req.body.category
  const icon = req.body.icon

  return Category.create({
    category,
    icon
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/records/newRecord', (req, res) => {
  let categorysList = []
  Category.find()
    .lean()
    .then(categorys => {
      for (const category of categorys) {
        categorysList.push(category)
      }
      return categorysList
    })
  return res.render('newRecord', { categorysList })
})

app.post('/records', (req, res) => {
  const topic = req.body.topic
  const date = req.body.date
  const category = req.body.category
  const price = req.body.price
  const category_icon = req.body.category_icon
  // let category_icon = ''

  // Category.find()
  //   .lean()
  //   .then(categories => {
  //     for (const category of categories) {
  //       if (newCategory === category.category) {
  //         category_icon = category.icon
  //         console.log(category_icon)
  //         return category_icon
  //       }
  //     }
  //   })
  return Record.create({
    topic,
    date,
    category,
    category_icon,
    price
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.error(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const topic = req.body.topic
  const date = req.body.date
  const category = req.body.category
  const price = req.body.price
  return Record.findById(id)
    .then(rocord => {
      rocord.topic = topic
      rocord.date = date
      rocord.category = category
      rocord.price = price
      return rocord.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.error(error))
})

app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(rocord => rocord.remove())
    .then(rocord => res.redirect('/'))
    .catch(error => console.error(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
