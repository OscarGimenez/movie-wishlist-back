var express = require('express');
const axios = require('axios');
var admin = require("../server/firebase");
var router = express.Router();

router.get('/movies/1.0/list/all', async function (req, res, next) {
  try {
    let ref = admin.database().ref("movies");
    ref.once('value', snapshot => {
      result = snapshot.val();
      res.json(result);
    });
  } catch (error) {
    res.json({
      errorMsg: 'There was an error retrieving the movies'
    });
  }
});

// router.post('/user-movies/1.0/add', async function (req, res, next) {
//   try {
//     data = {
//       username: req.body.username,
//       movie: req.body.movie
//     };

//     const url = properties.get('pro.db.query.wishlist');
//     let result = await axios.post(url, data);
//     res.json({
//       res: result
//     });
//   } catch (err) {
//     res.json({
//       err: err
//     });
//   }
// });

router.post('/user-movies/1.0/add', async function (req, res, next) {
  try {
    data = {
      username: req.body.username,
      movie: req.body.movie
    };
    let ref = admin.database().ref("/").child("wishlist");
    ref.push({
      username: data.username,
      movie: data.movie
    });
  } catch (err) {
    res.json({
      err: err
    });
  }
});

//TODO:
// router.post('/user-movies/1.0/remove', async function (req, res, next) {
//   try {
//     data = {
//       username: req.body.username,
//       movie: req.body.movie
//     };
//     res.json(result.data);
//   } catch (error) {
//     console.error(error);
//     res.json({
//       errorMsg: 'There was an error retrieving the movies'
//     });
//   }
// });


router.get('/user-movies/1.0/list/:user', async function (req, res, next) {
  try {
    let user = req.params.user;
    console.log(user);
    let ref = admin.database().ref("/").child("wishlist");
    ref.orderByChild("username").equalTo(user)
      .once('value', snapshot => {
        console.log(snapshot);
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

module.exports = router;