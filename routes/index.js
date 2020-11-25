const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', (req, res) => res.redirect('login'));
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/home', ensureAuthenticated, (req, res) => res.render('home'));
router.get('/validate/:id', (req, res) => res.render('validate'));
router.get('/files/:id', ensureAuthenticated, (req, res) => res.render('fileview'));

// Dashboard

module.exports = router;