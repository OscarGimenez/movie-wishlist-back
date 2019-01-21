var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/movies/1.0/list/all', async function (req, res, next) {
  try {
    let result = await axios.get('https://movie-wishlist-60107.firebaseio.com/movies.json');
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

router.post('/user-movies/1.0/add', async function (req, res, next) {
  try {
    data = {
      username: req.body.username,
      movie: req.body.movie
    };

    let result = await axios
      .post("https://movie-wishlist-60107.firebaseio.com/wishlist.json", data);
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
    let result = await axios.get(`https://movie-wishlist-60107.firebaseio.com/wishlist.json?orderBy="username"&equalTo="${user}"`);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.json({
      errorMsg: 'There was an error retrieving the movies'
    });
  }
});

module.exports = router;