const express = require('express');
const db = require('pg');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const {Users, Files} = require('../db/index.js');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.post('/login/', (req, res, next) => {
    const { email, password } = req.body;
    var execError = (err) => { res.status(400).send({message: err}); }
    let isError = false;
    
    if(!emailRegex.test(email)){execError("Not a valid Email."); isError = true;}
    if(password.length <8){execError("Not a valid Password."); isError = true;}

    if(!isError){
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
          })(req, res, next);
    }
});
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
router.post('/register/', (req, res) => {
    var errors = [];
    const { name, email, password, password2 } = req.body;
    var execError = (err) => { res.status(400).send({message: err}); }
    let isError = false;
    if(!emailRegex.test(email)){execError("Not a valid Email."); isError = true;}
    if(password.length <8){execError("Not a valid Password."); isError = true;}
    if(password !== password2){execError("Passwords don't match."); isError = true;}
    if(!name){execError("Passwords don't match."); isError = true;}
    if(!isError){
        Users.findByEmail(email, (err, user) => {
            if (user) {
              errors.push({ msg: 'Email already exists' });
              res.render('register', {
                errors,
                name,
                email,
                password,
                password2
              });
            } else {
              const newUser = {
                name,
                email,
                password
              };
      
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  Users.insert(email, name, hash, (user) => {
                      req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                      res.redirect('/login');
                    })
                    
                });
              });
            }
          });
        
    }

});

router.post('/upload', ensureAuthenticated, (req, res) => {
    
    if(req.files){
        var data = req.files.file.data.toString();
        try{
            JSON.parse(data);
            
            Files.insert(req.files.file.name, req.user.id, data, (err, result) => {
                !err ? res.redirect('/home') : res.status(400).send(err);
            });
        }
        catch(e){
            res.status(400).send({message: "Bad Request"});
        }
    }
    
});
router.get('/files/', ensureAuthenticated, (req,res) => {
    Files.findByUserId(req.user.id, (err, data) => { !err ? res.send(data) : res.status(404).send(err); });
});

router.get('/files/:id', ensureAuthenticated, (req,res) => {
    Files.findById(req.params.id, (err, data) => { !err? res.send(data) : res.status(404).send({message: 'No Data'}); });
});

module.exports = router;