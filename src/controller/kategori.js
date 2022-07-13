const db = require('../database');
const mailer = require('../mailer');
const multer = require("multer");
const fs = require('fs');
const upload = require('../multer')
// const path = require('path')
var date_time = new Date().toISOString('en-US', {
    timeZone: 'Asia/Jakarta'
}).replace(/T/, ' ').replace(/\..+/, '')
module.exports = {
    //fungsi untuk add kategori
    add_kategori: (req, res) => {
        try {
            const file = req.file.filename;
            const nama = req.body.nama
            const sql = "insert into kategori (nama,gambar) values (?,?)";
            if (!file) {
                res.status(400).send({
                    status: 400,
                    data: "No File is selected.",
                });
            }
            db.query(sql, [nama, file], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                res.json({
                    status: res.statusCode,
                    message: 'suksess',
                });

            })
        } catch (error) {
            res.json({
                status: 400,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },

    //fungsi get semua kategori
    kategori: (req, res) => {
        try {
            const sql = "select * from kategori";
            db.query(sql, (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                res.json({
                    status: res.statusCode,
                    message: 'suksess',
                    data: rows
                });

            })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },

    //fungsi get spesifik kategori
    get_kategori: (req, res) => {
        try {
            const id = req.params.id
            const sql = "select * from kategori where id =?";
            db.query(sql, [id], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                res.json({
                    status: res.statusCode,
                    message: 'suksess',
                    data: rows
                });

            })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },


    //fungsi untuk add kategori
    edit_kategori: (req, res) => {
        try {
            const file = req.file.filename;
            const nama = req.body.nama
            const id = req.params.id;
            const sql = "update kategori set nama = ? , gambar = ? where id = ?"
            const sql_get = "select * from kategori where id =?";
            if (!file) {
                res.status(400).send({
                    status: 400,
                    data: "No File is selected.",
                });
            }

            db.query(sql_get, [id], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                gambar = rows[0].gambar
                fs.unlink('./public/img/' + gambar, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
            })

            db.query(sql, [nama, file, id], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                res.json({
                    status: res.statusCode,
                    message: 'suksess',
                });

            })
        } catch (error) {
            res.json({
                status: 400,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },

     //fungsi untuk hapus kategori
     delete_kategori:(req,res)=>{
        try {
            const id = req.params.id;
            const sql = 'delete from kategori where id = ?';
            const sql_get = "select * from kategori where id =?";
            db.query(sql_get, [id], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                gambar = rows[0].gambar
                fs.unlink('./public/img/' + gambar, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
            })
            db.query(sql,[id],(err,rows,fields)=>{
                if (err){
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                res.json({
                    status: res.statusCode,
                    message: 'suksess',
                });
            })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time +' | '+ req.method + ' => ' + req.hostname + req.path)
    }
}