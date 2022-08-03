const db = require('../database');
const mailer = require('../mailer');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/', '-').replace('/', '-')
module.exports = {
    request_otp: (req, res) => {
        try {
            const email = req.body.email;
            const generate_otp = Math.floor(100000 + Math.random() * 900000);
            var update = "update users set otp = ? where email = ?; select * from users where email = ?"
            db.query(update, [generate_otp, email, email], (err, rows, fields) => {
                if (err) throw err;
                res.json({
                    status: res.statusCode,
                    message: 'suksess',
                    data: rows[1][0]
                });
                mailer.sendmail(email, generate_otp)
            })
        } catch (error) {
            res.json({
                status: res.statusCode,
                message: error,
            });
        }
        console.log(date_time + ' | ' + req.method + ' => ' + req.hostname + req.path)
    },

    register: (req, res) => {
        try {
            const email = req.body.email;
            var query_check = "select count(*) as count from (users) where email = ?";
            db.query(query_check, [email], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                var check = rows[0].count;
                if (check == 0) {
                    var insert = "insert into users (email,no_tlp,nama,password) values (?,'','','');";
                    db.query(insert, email, (err, rows, fields) => {
                        if (err) throw err;
                        res.json({
                            status: res.statusCode,
                            message: 'suksess',
                            data: rows[0]
                        });
                    })
                } else if (check > 0) {
                    res.json({
                        status: 400,
                        message: 'email sudah ada',
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



    //fungsi login/register
    auth: (req, res) => {
        try {
            const email = req.body.email;
            var query_check = "select * from (users) where email = ?";
            db.query(query_check, [email], (err, rows, fields) => {
                if (err) {
                    console.error('error connecting: ' + err);
                    return res.json({
                        status: 500,
                        message: err,
                    });
                }
                if (rows.length == 0) {
                    res.json({
                        status: 400,
                        message: 'data tidak ditemukan',
                        // data: rows[0]
                    });
                } else {
                    res.json({
                        status: res.statusCode,
                        message: 'suksess',
                        data: rows[0]
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

    //fungsi melengkapi data users
    complete_auth: (req, res) => {
        try {
            const password = req.body.password;
            const nama = req.body.nama;
            const email = req.body.email;
            const sql = "update users set password = ?, nama = ? where email = ?;"
            db.query(sql, [password, nama, email, email], (err, rows, fields) => {
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
                    // data: rows[1][0]
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

    //fungsi untuk ganti password
    change_password: (req, res) => {
        try {
            const id = req.body.id;
            const password = req.body.password;
            const sql = 'update users set password = ? where id = ?; select * from users where id = ?';
            db.query(sql, [password, id, id], (err, rows, fields) => {
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
                    data: rows[1][0]
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

    //funsi untuk mengedit data users
    edit_user: (req, res) => {
        try {
            const id = req.params.id;
            const nama = req.body.nama;
            const no_tlp = req.body.no_tlp;
            const sql = 'update users set nama = ?, no_tlp = ? where id = ?; select * from users where id = ?';
            db.query(sql, [nama, no_tlp, id, id], (err, rows, fields) => {
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
                    data: rows[1][0]
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

    //fungsi untuk get semua data users
    users: (req, res) => {
        try {
            const sql = 'select * from users';
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

    //fungsi untuk get data user
    get_user: (req, res) => {
        try {
            const id = req.params.id;
            const sql = 'select * from users where id = ?';
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
                    data: rows[0]
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

    //fungsi untuk hapus user
    delete_user: (req, res) => {
        try {
            const id = req.params.id;
            const sql = 'delete from users where id = ?';
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

};