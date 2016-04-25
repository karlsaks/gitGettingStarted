var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var twit = require('twit') ;

app.use(express.static(path.join(__dirname, '../../')));

var mongojs = require('mongojs');
var db = mongojs('my_database',['founders']);
var bodyParser = require('body-parser');

app.get('/users', function (request, response){
  console.log("Get request from database")
  db.founders.find(function(err,docs){
    console.log(docs);
    response.json(docs);
  });
});

app.delete('/users/:id', function(request,response){
  var id = request.params.id;
  console.log(id);
  db.founders.remove({
    _id : mongojs.ObjectId(id)}, function(err,doc){
      response.json(doc);
  });
});
// // WORKING .....
// app.put('/users/mem/:id', function(request, response){
//   var id = request.params.id;
//   console.log(id);
//   db.founders.findAndModify({query :
//     {_id : mongojs.ObjectId(id)},
//     update :{$unset: {memory:""}},
//     new: true}, function(err,doc){
//       response.json(doc);
//   });
// });

app.put('/users/mem/:id', function(request, response){
  var id = request.params.id;
  console.log(id);
  db.founders.findAndModify({query :
    {memory : {$elemMatch: {_id :  mongojs.ObjectId(id)}}},
    update : 
    {$unset: {memory:""}},
    new: true}, function(err,doc){
      response.json(doc);
  });
});

app.get('/',function(request,response){
  console.log("client logged in");
  response.sendFile('index.html', { root: path.join(__dirname, '../../') });
  });

app.get('/@cedrusco/:inp',function(request,response){ 
  var inp = request.params.inp;   
  console.log("tweet name provided" +inp);
  var gstr= "@cedrusco";
  var str ="";
  // Authentication required for twitter API usage
  var T = new twit ({
   consumer_key: 'U3d2P6EZS5TLkMird8WZX2jZr',
   consumer_secret: 'VXMM38xfMT0nK6gUL2yeGQ2fB015G5cdiyRLckUgBphyy2TzIa',
   access_token: '714935849742438400-SEcXC7zcv8xSHS7or6i3n3eQr00eiHR',
   access_token_secret: 'c0hYI8m8s1SqaZvK3jTNnaCGUEz9HMO2WyZkzBOUOF0eM'
  });
  //definintion of parameters of my search 
  var parameters = {
   q:inp,
   count:10
  };
  T.get('search/tweets', parameters,
    function gotData(err, data) {
      var tweets = data.statuses ; 
      // loop used to show the tweets matching our parameters in the console
      tweets = tweets.map(function(tweet) {
        return tweet.text;
      });
    response.json(tweets);
  });
});


io.on('connection',function(client) {
	//console.log('*client connected saying : ');
	var greet = require('./greet');
	greet();
	client.emit('messages', {automatedReply: 'Our specialists will look into your issue, then get back to you as soon as possible! \nSorry for the inconvenience'})
	client.on('messages',function(data) {
     console.log(data);
	});
});
server.listen(8000);