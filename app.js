const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Todo = require('./models/todo')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//用app.use規定每一筆請求都要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extend: true }))

app.get('/', (req, res) => {
  Todo.find()//取出Todo model裡的所有資料
    .lean()//把Mongoose的Model物件轉換成乾淨的JavaScripts資料陣列
    .then(todos => res.render('index', { todos }))//將資料傳給index樣板
    .catch(error => console.error(error))//錯誤處理
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  // return Todo.create({ name })
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))

  const todo = new Todo({ name })
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})