// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
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
    .sort({ _id: 'desc' })
    .then(records => {
      for (const record of records) {
        totalAmount += record.price
      }
      return res.render('index', { records, totalAmount, categorysList })
    })
    .catch(err => console.error(err))
})

module.exports = router
