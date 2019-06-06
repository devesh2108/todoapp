var express = require('express');
var router = express.Router();
var usersmodel=require('../models/usersmodel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{'print':''});
});

router.post('/register',function(req,res,next){
  usersmodel.userregister('register',req.body,function(result){
    if(result){
      res.render('index',{'print':'Registered Successfully, Login to use Services'})
    }
    else{
      res.render('index',{'print':'Registeration Failed'})
    }
  })
});

router.post('/login', function(req, res, next) {
  var data={'username':req.body.username,'password':req.body.password}
  usersmodel.logincheck(data,function(result){
    if(result.length>0){
      if(req.body.chk!=undefined){
       res.cookie('unm',req.body.username,{'expire':3600})
       res.cookie('pass',req.body.password,{'expire':3600})
      }
      req.session.unm=req.body.username 
      if(result)
           res.redirect('/users')
      }	    
    else
      res.render('index',{'print':'Invalid username or password'});
  });              
});

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
});


module.exports = router;
