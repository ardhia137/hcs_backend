const db = require('../database');
const mailer = require('../mailer');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/','-').replace('/','-')
module.exports = {
    // fungsi menambah role
    add_role: (req, res) => {
        try {
            const nama = req.body.nama;
            const sql = "insert into role (nama) values (?)";
            db.query(sql, [nama], (err, rows, fields) => {
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

    //fungsi get semua role
    role: (req, res) => {
        try {
            const sql = "select * from role";
            db.query(sql, (err, rows, fields) => {
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

    //fungsi untuk get spesifik role
    get_role: (req, res) => {
        try {
            const id = req.params.id;
            const sql = "select * from role where id = ?";
            db.query(sql,[id], (err, rows, fields) => {
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

    //fungsi untuk edit role
    edit_role: (req, res) => {
        try {
            const id = req.params.id;
            const nama = req.body.nama;
            const sql = "update role set nama = ? where id = ?; select * from role where id = ?";
            db.query(sql,[nama,id,id], (err, rows, fields) => {
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
                    data : rows[1]
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

    //fungsi untuk hapus role
    delete_role:(req,res)=>{
        try {
            const id = req.params.id;
            const sql = 'delete from role where id = ?';
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