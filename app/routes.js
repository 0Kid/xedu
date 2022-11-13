const express = require('express');
const router = express.Router();
const mime = require('mime-types');
require('dotenv').config()

// Middlewares
const authtoken = require('./policy/Policy');

const AuthController = require('./controller/AuthController');
const BannerController = require('./controller/BannerController');
const BeritaController = require('./controller/BeritaController');
const LaporController = require('./controller/LaporController');
const SekolahController = require('./controller/SekolahController');


//SEKOLAH
router.post('/api/sekolah/signup', SekolahController.signUp);
router.post('/api/sekolah/signin', SekolahController.signIn);
router.get('/api/sekolah/', SekolahController.index);
router.get('/api/sekolah/:id', SekolahController.find, SekolahController.show);
router.patch('/api/sekolah/update/:id', SekolahController.find,SekolahController.update);
router.delete('/api/sekolah/delete/:id', SekolahController.find,SekolahController.delete);

//AUTH
router.post('/api/auth/signup', AuthController.signUp);
router.post('/api/auth/signin', AuthController.signIn);
router.get('/api/auth/', AuthController.index);
router.get('/api/auth/:id', AuthController.find, AuthController.show);
router.patch('/api/auth/update/:id', AuthController.find,AuthController.update);
router.delete('/api/auth/delete/:id', AuthController.find,AuthController.delete);

//berita
router.post('/api/berita/create', BeritaController.create);
router.get('/api/berita/', BeritaController.index);
router.get('/api/berita/:id', BeritaController.find, BeritaController.show);
router.patch('/api/berita/update/:id', BeritaController.find,BeritaController.update);
router.delete('/api/berita/delete/:id', BeritaController.find,BeritaController.delete);

//banner
router.post('/api/banner/create', BannerController.create);
router.get('/api/banner/', BannerController.index);
router.get('/api/banner/:id', BannerController.find, BannerController.show);
router.patch('/api/banner/update/:id', BannerController.find,BannerController.update);
router.delete('/api/banner/delete/:id', BannerController.find,BannerController.delete);

//banner
router.post('/api/lapor/create', LaporController.create);
router.get('/api/lapor/', LaporController.index);
router.get('/api/lapor/byuser/', LaporController.indexByAuth);
router.get('/api/lapor/bysekolah/', LaporController.indexBySekolah);
router.get('/api/lapor/:id', LaporController.find, LaporController.show);
router.patch('/api/lapor/update/:id', LaporController.find,LaporController.update);
router.delete('/api/lapor/delete/:id', LaporController.find,LaporController.delete);



module.exports = router;
