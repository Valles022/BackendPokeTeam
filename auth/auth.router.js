const express = require('express');
const router = express.Router();
const authHttpHandler = require('./auth.http')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

const image = upload.single('file')
const user = upload.single('user')
const password = upload.single('password')

router.route('/login')
    .post(authHttpHandler.login);

router.route('/register')
    .post(upload.single('file'),authHttpHandler.register);

router.route('/getAll')
    .get(authHttpHandler.getAll);

exports.router = router;