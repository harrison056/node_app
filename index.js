// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.set("strictQuery", true);

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

//rotas
const routePerson = require('./routes/routePerson')
app.use('/person', routePerson)

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${ DB_USER }:${ DB_PASSWORD }@cluster0.qxhns7y.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))