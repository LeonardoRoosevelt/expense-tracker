// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const filter = require('./modules/filter')
const categorys = require('./modules/categorys')
const records = require('./modules/records')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') // 掛載 middleware

router.use('/records', authenticator, records)
router.use('/categorys', authenticator, categorys)
router.use('/filter', filter)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
