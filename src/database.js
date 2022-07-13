const mysql = require('mysql');
const env = require('dotenv');
env.config();
try {
     db =  mysql.createConnection({
        multipleStatements: true,
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME
    })
    db.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    })
  } catch (err) {
    console.error(err)
  }
module.exports = db;