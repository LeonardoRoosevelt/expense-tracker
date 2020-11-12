// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')
const { dateFormat, monthFilter } = require('../../public/javascript/function')

router.get('/', (req, res) => {
  let categories = req.query.category
  let months = req.query.month
  let totalAmount = 0
  let categorysList = []
  let recordList = []
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

  Record.find({
    userId: { $in: [req.user._id, null] }
  })
    .lean()
    .sort({ _id: 'desc' })
    .then(records => {
      records.map(record => {
        let currentMonth = monthsList[monthFilter(record.date)]
        if (categories === '全部' && months === '全部') {
          record.date = dateFormat(record.date)
          recordList.push(record)
          totalAmount += record.price
        } else if (months === '全部') {
          if (categories === record.category) {
            record.date = dateFormat(record.date)
            recordList.push(record)
            totalAmount += record.price
          }
        } else if (categories === '全部') {
          if (months === currentMonth) {
            record.date = dateFormat(record.date)
            recordList.push(record)
            totalAmount += record.price
          }
        } else {
          if (months === currentMonth && categories === record.category) {
            record.date = dateFormat(record.date)
            recordList.push(record)
            totalAmount += record.price
          }
        }
      })
    })
    .then(() =>
      res.render('index', {
        records: recordList,
        totalAmount,
        categorysList,
        monthsList,
        months,
        categories
      })
    )

    .catch(err => console.error(err))
})

module.exports = router
