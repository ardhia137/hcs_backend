const db = require('../database');
const fs = require('fs');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/', '-').replace('/', '-')
module.exports = {
    //fungsi untuk add produk
    add_produk: (req, res) => {
        //fungsi untuk add berita
        try {
            const file = req.file.filename;
            const nama = req.body.nama;
            const harga = req.body.harga;
            const stok = req.body.stok;
            const deskripsi = req.body.deskripsi;
            const id_kategori = req.body.id_kategori;
            const date = date_time.substring(0, date_time.indexOf(','))
            console.log(date)
            const sql = "insert into produk (nama,harga,stok,deskripsi,id_kategori,gambar) values (?,?,?,?,?,?)";
            if (!file) {
                res.status(400).send({
                    status: 400,
                    data: "No File is selected.",
                });
            }
            db.query(sql, [nama,harga,stok,deskripsi,id_kategori,file], (err, rows, fields) => {
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

    //fungsi get semua produk
    produk: (req, res) => {
        try {
            const sql = "SELECT produk.*,kategori.nama as kategori FROM produk,kategori WHERE produk.id_kategori = kategori.id;";
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

     //fungsi get spesifik produk
     get_produk: (req, res) => {
        try {
            const id = req.params.id;
            const sql = "SELECT produk.*,kategori.nama as kategori FROM produk,kategori WHERE produk.id_kategori = kategori.id AND produk.id = ?";
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

     //fungsi untuk add produk
     edit_produk: (req, res) => {
        const nama = req.body.nama;
        const harga = req.body.harga;
        const stok = req.body.stok;
        const deskripsi = req.body.deskripsi;
        const id_kategori = req.body.id_kategori;
        var id = req.params.id;
        var sql = "update produk set nama = ? , harga = ?, stok = ?, deskripsi =  ?, id_kategori = ? where id = ?"
        var data = [nama,harga,stok,deskripsi,id_kategori,id]
        var file = null;
        var sql_get = "select * from produk where id =?";
        if (req.file != undefined) {
            sql = "update produk set nama = ? , harga = ?, stok = ?, deskripsi =  ?, id_kategori = ?, gambar = ? where id = ?"
            file = req.file.filename;
            data = [nama,harga,stok,deskripsi,id_kategori,file,id]
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


     //fungsi untuk hapus produk
     delete_produk:(req,res)=>{
        try {
            const id = req.params.id;
            const sql = 'delete from produk where id = ?';
            const sql_get = "select * from produk where id =?";
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