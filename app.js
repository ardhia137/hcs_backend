const express = require('express')
const app = express()
const router = require('./src/router')
const test = require('./test')
const multer = require('multer');
const path = require('path');
const upload = require('./src/multer');
// const { diskStorage } = require('multer');

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(router)
app.listen(port, () => {
  console.log(`Server has been running listening on port ${port}`)
})