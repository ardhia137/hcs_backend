const db = require('../database');
const mailer = require('../mailer');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/', '-').replace('/', '-')
module.exports = {
    //fungsi untuk add keranjang by email
    add_keranjang: (req, res) => {
        try {
            // const id_users = req.body.id_users;
            const email = req.body.email;
            const id_produk = req.body.id_produk;
            const jumlah = req.body.jumlah;
            const get_id_users = "select id from users where email = ?; ";
            db.query(get_id_users, [email], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                const id_users = rows[0]['id'];
                const get_keranjang_by_id = "select * from keranjang where id_users = ? && id_produk = ?;"
                db.query(get_keranjang_by_id, [id_users,id_produk], (err, rows, fields) => {
                    if (err) {
                        console.error('error connecting: ' + err);
                        return res.json({
                            status: 500,
                            message: err,
                        });
                    }
                    // console.log(rows[0]['jumlah']+1);
                    // console.log(rows[0]['id'])
                    var sql = "insert into keranjang (id_users,id_produk,jumlah) values (?,?,?)";
                    var data = [id_users, id_produk, jumlah];
                    if (rows.length > 0) {
                        const id_keranajang = rows[0]['id'];
                        const jumlah = rows[0]['jumlah']+1;
                        sql = "update keranjang set jumlah = ? where id = ?";
                        data = [jumlah,id_keranajang];
                    }
                    // console.log(sql);
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
                })
            })

        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },

    //fungsi untuk get spesifik keranjang by email
    get_keranjang: (req, res) => {
        try {
            const sql = "SELECT produk.id as id_produk, produk.nama , produk.harga, produk.stok, produk.gambar, keranjang.id_users ,keranjang.jumlah,keranjang.id FROM keranjang,produk WHERE keranjang.id_produk = produk.id AND  keranjang.id_users = ?";
            const get_id_users = "select id from users where email = ?; ";
            const email = req.body.email;
            db.query(get_id_users, [email], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                const id_users = rows[0]['id'];
            db.query(sql, [id_users], (err, rows, fields) => {
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
        })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },

    //fungsi untuk update keranjang user
    update_keranajang:(req,res)=>{
        try {
            const sql = "update keranjang set jumlah = ? where id = ? ";
            const id_keranajang = req.body.id_keranjang;
            const jumlah = req.body.jumlah;
            db.query(sql, [jumlah,id_keranajang], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                //cek apakah data ada atau tidak
                if(rows['affectedRows'] > 0){

                    res.json({
                        status: res.statusCode,
                        message: 'suksess',
                    });
                }else{
                    res.json({
                        status: 404,
                        message: 'tidak ada data',
                    });
                }

                })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },

    //fungsi untuk hapus keranjang
    delete_keranjang: (req, res) => {
        try {
            const id = req.params.id;
            const sql = 'delete from keranjang where id = ?';
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
                });
            })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    }

}