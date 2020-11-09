// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Category = require('../../models/category')

router.get('/newCategory', (req, res) => {
  return res.render('newCategory')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const category = req.body.category
  const icon = req.body.icon

  return Category.create({
    category,
    icon,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
