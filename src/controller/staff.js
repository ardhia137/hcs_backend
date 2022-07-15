const db = require('../database');
const mailer = require('../mailer');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/','-').replace('/','-')
module.exports = {
    add_staff:(req,res)=>{
        try {
            const nama = req.body.nama;
            const email = req.body.email;
            const password = req.body.password;
            const no_tlp = req.body.no_tlp;
            const id_role = req.body.id_role;
            const sql = "insert into staff (nama,email,password,no_tlp,id_role) values (?,?,?,?,?)"
            db.query(sql, [nama,email,password,no_tlp,id_role], (err, rows, fields) => {
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

    //fungsi untuk get semua staff
    staff:(req,res)=>{
        try {
            const sql = "SELECT staff.*,role.nama as role FROM staff,role WHERE staff.id_role = role.id;"
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
                    data: rows
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

    //fungsi get spesifik staff
    get_staff:(req,res)=>{
        try {
            const id = req.params.id;
            const sql = "SELECT staff.*,role.nama as role FROM staff,role WHERE staff.id_role = role.id and staff.id = ?; select * from role"
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
                    data: rows
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

    //fungsi edit staff
    edit_staff:(req,res)=>{
        try {
            const nama = req.body.nama;
            const email = req.body.email;
            const password = req.body.password;
            const no_tlp = req.body.no_tlp;
            const id_role = req.body.id_role;
            const id = req.params.id;
            const sql = "update staff set nama = ?, email=?, no_tlp=?, id_role=?, password=? where id = ?;"
            db.query(sql,[nama,email,no_tlp,id_role,password,id], (err, rows, fields) => {
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

    //fungsi untuk edit password
    change_password:(req,res)=>{
        try {
            const password = req.body.password;
            const id = req.body.id;
            const sql = "update staff set password=? where id = ?;"
            db.query(sql,[password,id], (err, rows, fields) => {
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

    //fungsi untuk hapus staff
    delete_staff:(req,res)=>{
       try {
        const id = req.params.id;
        const sql = 'delete from staff where id = ?';
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