var express = require('express');
var router = express.Router();

/*
 *  GET userlist
 */

router.get('/userlist', function(req, res){
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

module.exports = router;
