var express = require('express');
const axios = require('axios');
var router = express.Router();

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./config/properties.ini');

const databaseURL = properties.get('pro.db.url');

// Firebase
var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// API Routes
router.get('/movies/1.0/list/all', async function (req, res, next) {
  try {
    let db = admin.database();
    let ref = db.ref("movies");
    ref.once("value", function (snapshot) {
      result = snapshot.val();
      res.json(result);
    });
  } catch (error) {
    console.error(error);
    res.json({
      errorMsg: 'There was an error retrieving the movies'
    });
  }
});

router.post('/user-movies/1.0/add', async function (req, res, next) {
  try {
    data = {
      username: req.body.username,
      movie: req.body.movie
    };

    const url = properties.get('pro.db.query.wishlist');
    let result = await axios.post(url, data);
    res.json({
      res: result
    });
  } catch (err) {
    res.json({
      err: err
    });
  }
});

router.post('/user-movies/1.0/remove', async function (req, res, next) {
  try {
    data = {
      username: req.body.username,
      movie: req.body.movie
    };
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.json({
      errorMsg: 'There was an error retrieving the movies'
    });
  }
});

router.get('/user-movies/1.0/list/:user', async function (req, res, next) {
  try {
    let user = req.params.user;
    const url = properties.get('pro.db.query.wishlist');
    let result = await axios.get(url + `?orderBy="username"&equalTo="${user}"`);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.json({
      errorMsg: 'There was an error retrieving the movies'
    });
  }
});

module.exports = router;