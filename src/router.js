const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
// const diskStorage = require('./multer')
const usersController = require('./controller/users');
const roleController = require('./controller/role');
const staffController = require('./controller/staff');
const alamatController = require('./controller/alamat');
const kategoriController = require('./controller/kategori');
const upload = require('./multer');

//router users
router.route('/api/auth').post(multer().array(),usersController.auth);
router.route('/api/complete_auth').post(multer().array(),usersController.complete_auth);
router.route('/api/change_password').post(multer().array(),usersController.change_password);
router.route('/api/edit_user/:id').get(usersController.get_user).post(multer().array(),usersController.edit_user);
router.route('/api/users').get(usersController.users);
router.route('/api/delete_user/:id').delete(usersController.delete_user);

//router role
router.route('/api/role').get(roleController.role).post(multer().array(),roleController.add_role);
router.route('/api/edit_role/:id').get(roleController.get_role).post(multer().array(),roleController.edit_role);
router.route('/api/delete_role/:id').delete(roleController.delete_role);

//router staff
router.route('/api/staff').get(staffController.staff).post(multer().array(),staffController.add_staff);
router.route('/api/edit_staff/:id').get(staffController.get_staff).post(multer().array(),staffController.edit_staff);
router.route('/api/delete_staff/:id').delete(staffController.delete_staff);
router.route('/api/change_password_staff').post(multer().array(),staffController.change_password);

//router alamat
router.route('/api/alamat').get(alamatController.alamat).post(multer().array(),alamatController.add_alamat)
router.route('/api/edit_alamat/:id').get(alamatController.get_alamat).post(multer().array(),alamatController.edit_alamat);
router.route('/api/delete_alamat/:id').delete(alamatController.delete_alamat);
router.route('/api/users/alamat/:id_users').get(alamatController.alamat_users);

router.route('/api/kategori').post(multer({ storage: upload.upload() }).single("gambar"),kategoriController.add_kategori).get(kategoriController.kategori)
router.route('/api/edit_kategori/:id').post(multer({ storage: upload.upload() }).single("gambar"),kategoriController.edit_kategori).get(kategoriController.get_kategori)
router.route('/api/delete_kategori/:id').delete(kategoriController.delete_kategori);
// app

module.exports = router