var express = require('express');
var router = express.Router();
var User = require("./../models/users.js");
/* GET users listing. */
router.get('/signup', function(req, res) {
  res.render('users/signup');
});

router.post('/signup', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.render('500');
    } else if (user) {
      req.flash('danger', 'Email address already in use');
      res.redirect('/users/signup');
    } else {
      var user = new User();
      user.email = req.body.email;
      user.password = user.generateHash(req.body.password);
      user.save(function(err) {
        if (err) {
          res.render('500');
        } else {
          req.flash('success', "Thank's for signing up! You're now logged in.")
          res.redirect('/users/profile');
        }
      });
    }
  });
});

router.get("/profile",function(res,res){
		res.render('users/profile');
})


router.get("/login",function(req,res){
  res.render("users/login");
})

router.post('/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.render('500');
    } else if (!user || !user.isValidPassword(req.body.password)) {
      req.flash('danger', 'Email or password is incorrect');
      res.redirect('/users/login');
    } else {
    	req.login(user,function(err){    		
    		if(err){
    			res.render(500);
    		}else{
    			req.flash('success', "You're now logged in.");
      			res.redirect('/users/profile');
    		}
    	})      
    }
  });
});

module.exports = router;
