var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var twit = require('twit') ;
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/my_database');

app.use(express.static(path.join(__dirname, '../')));
// 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

/*var dropRestaurants = function(db, callback) {
   db.collection('users').drop( function(err, response) {
      console.log(response)
      callback();
   });
};*/

// var insertDocument = function(db, callback) {
//    db.collection('restaurants').insertOne( {
//       "address" : {
//          "street" : "Karls ",
//          "zipcode" : "10075",
//          "building" : "1480",
//          "coord" : [ -73.9557413, 40.7720266 ]
//       },
//       "borough" : "Manhattan",
//       "cuisine" : "Italian",
//       "grades" : [
//          {
//             "date" : new Date("2014-10-01T00:00:00Z"),
//             "grade" : "A",
//             "score" : 11
//          },
//          {
//             "date" : new Date("2014-01-16T00:00:00Z"),
//             "grade" : "B",
//             "score" : 17
//          }
//       ],
//       "name" : "Vella",
//       "restaurant_id" : "41704620"
//    }
//    db.collection('users').insertOne({
//       "name": "Nicolas Jabbour",
//       "role": "Managing Partner",
//       "cover": "../img/cnj.png",
//       "memory": [{
//         "category": "Fun",
//         "occasion": " Company's yearly dinner",
//         "body": "Discussed football facts, happened to be supporters of the same team. Come on you Gunners !",
//         "author": "Karl"
//       }]	

//     }, function(err, result) {
//     assert.equal(err, null);
//     console.log("Inserted a document into the restaurants collection.");
//     callback();
//   });
// };

app.get ('/users', function ( request, response ){

var findUsers = function(db, callback) {
   var cursor =	db.collection('members').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         response.json(doc);
      } else {
         callback();
      }
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findUsers(db,function() {	
  	db.close();
  });
});

})


/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  	dropRestaurants(db,function() {
	  insertDocument(db, function() {
	    findUsers(db, function() {
	      	db.close();
	  	});
	  });
	});
});*/



    ///////////////////////////////////////////////////////////////////////////////////////////////
app.get('/@cedrusco',function(request,response){    
 // I am setting this URL as a way to access my TWEET Selection from the foundners.html page
// 	//////////////////////////////////////////////////////////////////////////////////////////////

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
var params = {
	q:"@arsenal",
	count:10
};
  T.get('search/tweets', params,
	function gotData(err, data) {
		var tweets = data.statuses ; 
		// loop used to show the tweets matching our parameters in the console
		tweets = tweets.map(function(tweet) {
      return tweet.text;
    });

    response.json(tweets);

           var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne({
      "name": "Nicasdr",
      "role": "Managiasdrtner",
      "cover": "../img/cnj.png",
      "memory": [{
        "category": "Fun",
        "occasion": " Companasdy's yearly dinner",
        "body": "Discussed fasdasdasdootball facts, happened to be supporters of the same team. Come on you Gunners !",
        "author": "Karl"
      }]	
    }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db,function() {	
  	db.close();
  });
});
});


app.get('/',function(request,response){
	console.log("client logged in");
	response.sendFile('index.html', { root: path.join(__dirname, '../') });
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