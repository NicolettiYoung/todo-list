//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入home模組程式碼
const home = require('./modules/home')

//引入路由模組，並匯入路由器
module.exports = router

//將網址結構符合 / 字串的request導向home模組
router.use('/', home)