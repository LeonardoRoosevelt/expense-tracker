// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')
const { dateFormat } = require('../../public/javascript/function')

router.get('/newRecord', (req, res) => {
  let categorysList = []
  Category.find({ userId: { $in: [req.user._id, null] } })
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
  const merchant = req.body.merchant
  const [category, category_icon] = categories.split('|')
  const userId = req.user._id

  return Record.create({
    topic,
    date,
    category,
    category_icon,
    price,
    merchant,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ userId, _id })
    .lean()
    .then(record => res.render('detail', { record }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  let categorysList = []
  Category.find({ userId: { $in: [req.user._id, null] } })
    .lean()
    .then(categorys => {
      for (const category of categorys) {
        categorysList.push(category)
      }
      return categorysList
    })
  Record.findOne({ userId, _id })
    .lean()
    .then(record => {
      record.date = dateFormat(record.date)
      return res.render('edit', { record, categorysList })
    })
    .catch(error => console.error(error))
})

router.post('/:id/edit', (req, res) => {
  const _id = req.params.id
  const topic = req.body.topic
  const date = req.body.date
  const categories = req.body.category
  const price = req.body.price
  const merchant = req.body.merchant
  const userId = req.user._id
  const [category, category_icon] = categories.split('|')
  return Record.findOne({ userId, _id })
    .then(record => {
      record.topic = topic
      record.date = date
      record.category = category
      record.category_icon = category_icon
      record.price = price
      record.merchant = merchant

      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.error(error))
})

router.post('/:id/delete', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ userId, _id })
    .then(rocord => rocord.remove())
    .then(rocord => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
