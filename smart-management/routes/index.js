var express = require('express');
var firebase = require('firebase');
var router = express.Router();
const mongoose = require('mongodb');
const Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/error', (req, res) => {
  res.render('error', { title: 'Erro', layout: 'layout' });
});


router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', layout: 'layout' });
});

router.get('/deucerto', function(req, res, next) {
  res.render('deucerto', { title: 'TESTE' });
});

router.post('/login', (req, res) => {
  const user = req.body.user;
  console.log(user);
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((logado) => {
    console.log(logado);
    res.redirect('/deucerto');
    //res.redirect('/');
  }).catch((error) => {
    console.log(error);
  });
});

router.post('/deucerto', (req, res) => {
  Product.getAll().then((products) => {
    console.log(products);
    res.redirect('/deucerto');
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});


module.exports = router;
