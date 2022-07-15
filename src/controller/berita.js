const db = require('../database');
const fs = require('fs');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/', '-').replace('/', '-')
module.exports = {
    add_berita: (req, res) => {
        try {
            const file = req.file.filename;
            const judul = req.body.judul;
            const artikel = req.body.artikel;
            const id_staff = req.body.id_staff;
            const date = date_time.substring(0, date_time.indexOf(','))
            console.log(date)
            const sql = "insert into berita (judul,artikel,id_staff,tanggal,gambar) values (?,?,?,?,?)";
            if (!file) {
                res.status(400).send({
                    status: 400,
                    data: "No File is selected.",
                });
            }
            db.query(sql, [judul, artikel, id_staff, date, file], (err, rows, fields) => {
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

    //fungsi get semua berita
    berita: (req, res) => {
        try {
            const sql = "select * from berita";
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

    //fungsi get spesifik berita
    get_berita: (req, res) => {
        try {
            const id = req.params.id;
            const sql = "select * from berita where id = ?";
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
    edit_berita: (req, res) => {
        var judul = req.body.judul;
        var artikel = req.body.artikel;
        var id = req.params.id;
        var sql = "update berita set judul = ? , artikel = ? where id = ?"
        var data = [judul, artikel, id]
        var file = null;
        var sql_get = "select * from berita where id =?";
        if (req.file != undefined) {
            sql = "update berita set judul = ? , artikel = ?, gambar = ? where id = ?"
            file = req.file.filename;
            data = [judul, artikel, file, id]
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
        }
        try {

            db.query(sql, data, (err, rows, fields) => {
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

    //fungsi get spesifik berita by users
    get_berita_by_users: (req, res) => {
        try {
            const id_staff = req.params.id_staff;
            const sql = "select * from berita where id_staff = ?";
            db.query(sql, [id_staff], (err, rows, fields) => {
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

    //fungsi untuk hapus berita
    delete_berita:(req,res)=>{
        try {
            const id = req.params.id;
            const sql = 'delete from berita where id = ?';
            const sql_get = "select * from berita where id =?";
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