var express = require('express');
var url=require('url');
var router = express.Router();
var usersmodel = require('../models/usersmodel')

var myuser;
router.use('/', function(req, res, next) {
  myuser=req.session.unm
  if(myuser==undefined)
  {
   console.log('Invalid user please login first, IP tracking')
   res.redirect('/') 
  }	
  next()
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user',{'myuser':myuser,'print':''})
});

router.post('/addtask', function(req, res, next){
  data={'username':myuser,'task':req.body.task,'date':Date()}
  usersmodel.addTask(data,function(result){
    if(result){
      res.render('user',{'myuser':myuser,'print': 'Task Added Successfully'})
    }
    else{
      res.render('user',{'myuser':myuser,'print': 'Task not Added'})
    }
  })
});

router.get('/viewtask', function(req, res, next){
  data={'username':myuser}
  usersmodel.getTask(data,function(result){
    if(result){
      res.render('viewtask',{'task':result})
    }
    else{
      res.render('viewtask',{'task':'no data'})
    }
  })
});

router.get('/complete', function(req, res, next){
  var d=url.parse(req.url,true).query
  var data={'username':myuser,'task':d.task,'date':d.date}
  usersmodel.completeTask(data,function(result){
    if(result){
      res.redirect('/users/viewtask')
    }
    else{
      console.log('error')
    }
  })
});

module.exports = router;
