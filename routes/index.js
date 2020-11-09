// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const filter = require('./modules/filter')
const categorys = require('./modules/categorys')
const records = require('./modules/records')
const users = require('./modules/users')

router.use('/users', users)
router.use('/records', records)
router.use('/categorys', categorys)
router.use('/filter', filter)
router.use('/', home)

module.exports = router
