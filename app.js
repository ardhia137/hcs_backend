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
// const uploadd = multer({ dest: 'uploads/' })
// const upload = multer({ storage: diskStorage })
// app.put("/contact/upload",multer({ storage: upload.upload() }).single("test"),(req, res) => {
//     console.log('asd')
//     const file = req.file;
//     console.log(file);
//     if (!file) {
//       res.status(400).send({
//         status: false,
//         data: "No File is selected.",
//       });
//     }
//   }
// );
app.listen(port, () => {
  console.log(`Server has been running listening on port ${port}`)
})