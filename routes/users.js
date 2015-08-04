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

/*
 *POST to add new user
 */
router.post('/adduser', function(req, res){
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? {msg:''} : {msg:err}
    );
  });
});

/*
 * DELETE to delete a user
 */
 router.delete('/deleteuser/:id', function(req, res){
   var db = req.db;
   var collection = db.get('userlist');
   var delId = req.params.id;
   collection.remove({'_id':delId}, function(err){
     res.send((err === null) ? {msg:''} : {msg:err});
   });
 });

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

module.exports = router;
