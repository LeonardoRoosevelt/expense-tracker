// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const filter = require('./modules/filter')
router.use('/filter', filter)

const categorys = require('./modules/categorys')
router.use('/categorys', categorys)

const records = require('./modules/records')
router.use('/records', records)

module.exports = router
