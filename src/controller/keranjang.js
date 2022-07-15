const db = require('../database');
const mailer = require('../mailer');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/','-').replace('/','-')
module.exports = {
     //fungsi untuk add keranjang
     add_keranjang: (req, res) => {
        try {
            const id_users = req.body.id_users;
            const id_produk = req.body.id_produk;
            const jumlah = req.body.jumlah;
            const sql = "insert into keranjang (id_users,id_produk,jumlah) values (?,?,?)";
            db.query(sql, [id_users,id_produk,jumlah], (err, rows, fields) => {
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
    },

    //fungsi untuk get spesifik keranjang by id users
    get_keranjang: (req, res) => {
        try {
            const id_users = req.params.id_users;
            const sql = "SELECT produk.*,keranjang.id_users,keranjang.jumlah FROM keranjang,produk WHERE keranjang.id_produk = produk.id AND  keranjang.id_users = ?";
            db.query(sql,[id_users], (err, rows, fields) => {
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
                    data : rows
                });

            })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time +' | '+ req.method + ' => ' + req.hostname + req.path)
    },

    //fungsi untuk hapus keranjang
    delete_keranjang:(req,res)=>{
        try {
            const id = req.params.id;
            const sql = 'delete from keranjang where id = ?';
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

