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

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/movies/1.0/list/all', async function (req, res, next) {
  try {
    let db = admin.database();
    let ref = db.ref("movies");
    //FIXME: Try to handle better this
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
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
    //FIXME: Try to handle better this
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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

    //FIXME: Try to handle better this
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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
    //FIXME: Try to handle better this
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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