const express = require('express');
const firebase = require('firebase');
const User = require('../models/user');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login', function(req, res, next) {
  const user = req.body.user
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((fIREBASE) => {
    console.log("_________________________________________________________________________________________________");
    console.log(fIREBASE);
    console.log("_________________________________________________________________________________________________");
    console.log(fIREBASE.user.uid);
    console.log("_________________________________________________________________________________________________");
    res.redirect('/')
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
 });

 router.get('/getall', function(req, res, next) {
   User.getAll().then((users) => {
     const num = users.length
     console.log("_________________________________________________________________________________________________");
     console.log(`numero de usuarios no banco de dados:${num}`);
     var i;
     for (i = 0; i < users.length; i++) {
        console.log("_________________________________________________________________________________________________");
        console.log(users[i]);
      }
      res.render('allusers', { title: 'TODO ELES' });
   }).catch((error) => {
     console.log(error);
     res.redirect('/error');
   });
 });

 router.get('/getbyid', function(req, res, next) {
   res.render('getbyid', { title: 'login' });
 });

 router.post('/getbyid', function(req, res, next) {
   const id = req.body.id
   console.log(id);
   User.getById(id).then((user) => {
     console.log("_________________________________________________________________________________________________");
     console.log("Aqui está seu User:");
     console.log(user);
     console.log("_________________________________________________________________________________________________");
     res.redirect('/login')
   }).catch((error) => {
     console.log(error);
     res.redirect('/error');
   });
 });

 router.get('/create', function(req, res, next) {
   const user = {
     fullname: "Ortiz",
     email: "mulequetransante@gmail.com",
     phone: "666547333"
   };
   User.create(user).then((id) => {
     res.render('create', { title: 'CREATE' });
     console.log(id);
   }).catch((error) => {
     console.log(error);
     res.redirect('/error');
   });
 });

module.exports = router;
