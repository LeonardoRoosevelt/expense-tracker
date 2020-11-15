// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')
const { dateFormat } = require('../../public/javascript/function')

router.get('/', (req, res) => {
  let chart = req.query.chart
  res.render('chart', { chart })
})

router.get('/json', (req, res) => {
  let recordsList = []
  let categorysList = []
  let categoryRecord = []

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
        categorysList.push(category.category)
      }
      return categorysList
    })
  Record.find({ userId: { $in: [req.user._id, null] } })
    .lean()
    .sort({ _id: 'desc' })
    .then(records => {
      for (const record of records) {
        record.date = dateFormat(record.date)
        recordsList.push(record)
      }
    })
    .then(() => {
      let categories = categorysList
      for (const category of categories) {
        let totalAmount = 0
        for (const record of recordsList) {
          if (record.category === category) {
            totalAmount += record.price
          }
        }
        categoryRecord.push(totalAmount)
      }
    })
    .then(() => {
      let data = {
        month: monthsList,
        category: categorysList,
        record: categoryRecord
      }

      return res.json(data)
    })
    .catch(err => console.error(err))
})

module.exports = router
