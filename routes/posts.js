var express = require('express');
var router = express.Router();
var Post =require("./../models/posts.js");


router.get('/', function(req, res) {	
  Post.find({}).exec(function(err, posts) {
    if (err) {
      console.log("db error in GET /posts: " + err);
      res.render('500');
    } else {
      res.render('posts/index', {posts: posts});
    }
  });
});

router.get('/new', function(req, res) {
  res.render('posts/new');
});

router.post('/', function(req, res) {
  Post.create(req.body, function(err, post) {
    if (err) {
      console.log("db error in POST /posts: " + err);
      res.render('500');
    } else {
      res.send('created new post: ' + post);
    }
  });
});

module.exports = router;