const db = require('../database');
const mailer = require('../mailer');
var date_time = new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Jakarta'
}).replace('/','-').replace('/','-')
module.exports = {
    //fungsi untuk add alamat
    add_alamat: (req, res) => {
        try {
            const id_users = req.body.id_users;
            const alamat = req.body.alamat;
            const provinsi = req.body.provinsi;
            const kota = req.body.kota;
            const kecamatan = req.body.kecamatan;
            const label = req.body.label;
            const nama_penerima = req.body.nama_penerima;
            const no_tlp = req.body.no_tlp;
            const kode_pos = req.body.kode_pos;
            const sql = "insert into alamat (id_users,alamat,provinsi,kota,kecamatan,label,nama_penerima,no_tlp,kode_pos) values (?,?,?,?,?,?,?,?,?)";
            db.query(sql, [id_users,alamat,provinsi,kota,kecamatan,label,nama_penerima,no_tlp,kode_pos], (err, rows, fields) => {
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
    //fungsi untuk get alamat
    alamat: (req, res) => {
        try {
            const sql = "select * from alamat";
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

    //fungsi untuk get spesifik alamat
    get_alamat: (req, res) => {
        try {
            const id = req.params.id
            const sql = "select * from alamat where id = ?";
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
        } catch (err) {
            res.json({
                status: res.statusCode,
                message: err,
            });
        }
        console.log(date_time +' | '+ req.method + ' => ' + req.hostname + req.path)
    },

    //fungsi untuk edit alamat
    edit_alamat: (req, res) => {
        try {
            const id = req.params.id;
            const alamat = req.body.alamat;
            const provinsi = req.body.provinsi;
            const kota = req.body.kota;
            const kecamatan = req.body.kecamatan;
            const label = req.body.label;
            const nama_penerima = req.body.nama_penerima;
            const no_tlp = req.body.no_tlp;
            const kode_pos = req.body.kode_pos;
            const sql = "update alamat set alamat = ?, provinsi = ?, kota = ?, kecamatan = ?,label = ?,nama_penerima=?, no_tlp = ?, kode_pos = ?  where id = ?";
            db.query(sql,[alamat,provinsi,kota,kecamatan,label,nama_penerima,no_tlp,kode_pos,id], (err, rows, fields) => {
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

    //fungsi untuk hapus alamat
    delete_alamat:(req,res)=>{
        try {
            const id = req.params.id;
            const sql = 'delete from alamat where id = ?';
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
    },

     //fungsi untuk get alamat
     alamat_users: (req, res) => {
        try {
            id_users = req.params.id_users;
            const sql = "select * from alamat where id_users = ?";
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
}