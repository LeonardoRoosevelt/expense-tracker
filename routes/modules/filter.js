// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/:category', (req, res) => {
  let totalAmount = 0
  let categorysList = []
  let recordList = []
  Category.find({ userId: { $in: [req.user._id, null] } })
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
    .sort({ _id: 'desc' })
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

module.exports = router
