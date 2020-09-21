// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/newRecord', (req, res) => {
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

router.post('/', (req, res) => {
  const topic = req.body.topic
  const date = req.body.date
  const categories = req.body.category
  const price = req.body.price
  const [category, category_icon] = categories.split('|')

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

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  let categorysList = []
  Category.find()
    .lean()
    .then(categorys => {
      for (const category of categorys) {
        categorysList.push(category)
      }
      return categorysList
    })
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categorysList }))
    .catch(error => console.error(error))
})

router.post('/:id/edit', (req, res) => {
  const id = req.params.id
  const topic = req.body.topic
  const date = req.body.date
  const categories = req.body.category
  const price = req.body.price
  const [category, category_icon] = categories.split('|')
  return Record.findById(id)
    .then(record => {
      record.topic = topic
      record.date = date
      record.category = category
      record.category_icon = category_icon
      record.price = price

      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.error(error))
})

router.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(rocord => rocord.remove())
    .then(rocord => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
