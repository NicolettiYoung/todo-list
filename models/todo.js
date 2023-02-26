const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false//表紀錄產生時，會設定初始狀態為"未完成"
  }
})

module.exports = mongoose.model('Todo', todoSchema)