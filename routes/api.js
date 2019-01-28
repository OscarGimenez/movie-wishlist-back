var express = require('express');
const axios = require('axios');
var admin = require("../server/firebase");
var router = express.Router();

router.get('/movies/1.0/list/all', async function (req, res, next) {
  try {
    console.log('Entering: /movies/1.0/list/all');
    let db = admin.database();
    let ref = db.ref("movies");
    // ref.once("value", function (snapshot) {
    //   result = snapshot.val();
    //   console.log(result);
    //   res.json(result);
    // })
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      result = snapshot.val();
      res.json(result);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  } catch (error) {
    console.error(error);
    console.log('This was an error');
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