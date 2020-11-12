// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  let totalAmount = 0
  let categorysList = []
  let monthsList = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ]
  Category.find({ userId: { $in: [req.user._id, null] } })
    .lean()
    .then(categorys => {
      for (const category of categorys) {
        categorysList.push(category)
      }
      return categorysList
    })
  Record.find({ userId: { $in: [req.user._id, null] } })
    .lean()
    .sort({ _id: 'desc' })
    .then(records => {
      for (const record of records) {
        totalAmount += record.price
      }
      return res.render('index', {
        records,
        totalAmount,
        categorysList,
        monthsList
      })
    })
    .catch(err => console.error(err))
})

module.exports = router
