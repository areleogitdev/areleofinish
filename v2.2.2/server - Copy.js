// http://127.0.0.1:9001
// http://localhost:9001

	var server		   = require('http'),
		url 		   = require('url'),
		path		   = require('path'),
		fs 			   = require('fs');
	
	var express		   =         require("express");
	var app            =         express();
	var session		   =         require('express-session');
	//body pahesr untuk input dari html
	var bodyParser     =         require("body-parser");
	//parse jquery login
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());	
	
	var MongoClient = require('mongodb').MongoClient;
	//var url = "mongodb://localhost:27017/areleo_db";
	var url = "mongodb://db_test:12345@ds127564.mlab.com:27564/db_test";
	
	app.use(session({secret:"hsad7378236sa8*7s7ssjjsh",resave:false,saveUninitialized:true}));


	
app.get('/index',function(req,res){
  res.sendfile("demos/index.html");
});	
	
app.get('/rtc',function(req,res){

    if(typeof req.session.uniqueId == "undefined") {
		console.log("Not Login");
		res.redirect('/login');
	}else {
		res.sendfile("demos/videoconferencing.html");
	}
    
});	
	
app.get('/record',function(req,res){
  
      if(typeof req.session.uniqueId == "undefined") {
		console.log("Not Login");
		res.redirect('/login');
	}else {
		res.sendfile("demos/RecordRTC-and-RTCMultiConnection.html");
	}
  
});		
	
	



/*
app.post('/loginr',function(req,res){

  var user_name=req.body.user;
  var password=req.body.password;
  
  
  MongoClient.connect(url, function(err, db) {
  //if (err) throw err;
  var query = { nama: user_name };
  db.collection("login").find(query).toArray(function(err, result) {
    
    
            if (!result) { if (err) throw err;console.log("not found");}
            else{
                    console.log(result);
				req.session.usernamer = user_name;

				
				
				if(!req.session.usernamer) {
				console.log("Not Login");
				}else {

				console.log("Login");

				}
            }	
    db.close();
  });
});

//res.render(__dirname + '/rtc',{error: 'Invalid email or password.'});
  res.end("yes");

});*/

app.post('/login', function(req, res) {

  var NAME=req.body.user;
  var PASSWORD=req.body.password;
  console.log(NAME);
  
  
  MongoClient.connect(url, function(err, db) {
  //if (err) throw err;
  var query = { NAME: NAME, PASSWORD: PASSWORD };
  db.collection("login").find(query).toArray(function(err, result) {
    console.log("data" + req.session.uniqueId +"data" );
	
	
	
	
	
	
    
            if (1 > result.length) { 
			
				if (err) throw err;console.log("not found");
				res.redirect('/login');
				}
            else{
                console.log(result);
				req.session.uniqueId = NAME;
				
				
				if(!req.session.uniqueId) {
				console.log("Not Login");
				res.redirect('/login');
				}else {
				res.redirect('/rtc');
				console.log("Login");

				}
            }	
    db.close();
  });
});
});




app.post('/loginadmin', function(req, res) {

  var NAME=req.body.user;
  var PASSWORD=req.body.password;
  console.log(NAME);
  
  
  MongoClient.connect(url, function(err, db) {
  //if (err) throw err;
  var query = { NAME: NAME, PASSWORD: PASSWORD };
  db.collection("login").find(query).toArray(function(err, result) {
    console.log("data" + req.session.uniqueId +"data" );
	
	
	
	
	
	
    
            if (1 > result.length) { 
			
				if (err) throw err;console.log("not found");
				res.redirect('/login');
				}
            else{
                console.log(result);
				req.session.uniqueId = NAME;
				
				
				if(!req.session.uniqueId) {
				console.log("Not Login");
				res.redirect('/login');
				}else {
				res.redirect('/dashboardadmin');
				console.log("Login");

				}
            }	
    db.close();
  });
});
});


//insert
app.post('/insert', function(req, res) {

  var NAME=req.body.NAME;
  var TELEPHONE=req.body.TELEPHONE;
  var ADDRESS=req.body.ADDRESS;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = { NAME: NAME, TELEPHONE: TELEPHONE, ADDRESS: ADDRESS };
  db.collection("address").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});  

});
//read
app.get('/test', function(req, res, next) {
  //res.json({ message: 'Hello World', message1: 'Hello World 1' });
    
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //Sort the result by name:
  var sort = { nama: 1 };
  db.collection("address").find().sort(sort).toArray(function(err, result) {
    if (err) throw err;
	var myJsonString = JSON.stringify(result);
	res.json(result);
    db.close();
  }); 
  });
   
});
//update
app.post('/update', function(req, res) {

  var NAME=req.body.NAME;
  var TELEPHONE=req.body.TELEPHONE;
  var ADDRESS=req.body.ADDRESS;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { NAME: NAME };
  var newvalues = { NAME: NAME, TELEPHONE: TELEPHONE, ADDRESS: ADDRESS };
  db.collection("address").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});   

});
//delete
app.post('/delete', function(req, res) {

  var NAME=req.body.NAME;
  var TELEPHONE=req.body.TELEPHONE;
  var ADDRESS=req.body.ADDRESS;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { NAME: NAME };
  db.collection("address").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});    

});

//logout
app.get('/logout', function(req, res) {

req.session.destroy();
res.redirect('/login');

});





//admin
//insert
app.post('/createadmin', function(req, res) {

  var NAME=req.body.NAME;
  var TELEPHONE=req.body.TELEPHONE;
  var ADDRESS=req.body.ADDRESS;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = { NAME: NAME, TELEPHONE: TELEPHONE, ADDRESS: ADDRESS };
  db.collection("admin").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});  

});
//read
app.get('/readadmin', function(req, res, next) {
  //res.json({ message: 'Hello World', message1: 'Hello World 1' });
    
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //Sort the result by name:
  var sort = { nama: 1 };
  db.collection("admin").find().sort(sort).toArray(function(err, result) {
    if (err) throw err;
	var myJsonString = JSON.stringify(result);
	res.json(result);
    db.close();
  }); 
  });
   
});
//update
app.post('/updateadmin', function(req, res) {

  var NAME=req.body.NAME;
  var TELEPHONE=req.body.TELEPHONE;
  var ADDRESS=req.body.ADDRESS;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { NAME: NAME };
  var newvalues = { NAME: NAME, TELEPHONE: TELEPHONE, ADDRESS: ADDRESS };
  db.collection("admin").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});   

});
//delete
app.post('/deleteadmin', function(req, res) {

  var NAME=req.body.NAME;
  var TELEPHONE=req.body.TELEPHONE;
  var ADDRESS=req.body.ADDRESS;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myquery = { NAME: NAME };
  db.collection("admin").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});    

});






app.post('/login', function(req, res) {

  var user_name=req.body.user;
  var password=req.body.password;
  console.log(user_name);
  
  
  MongoClient.connect(url, function(err, db) {
  //if (err) throw err;
  var query = { nama: user_name, password: password };
  db.collection("login").find(query).toArray(function(err, result) {
    console.log("data" + req.session.uniqueId +"data" );
	
	
	
	
	
	
    
            if (1 > result.length) { 
			
				if (err) throw err;console.log("not found");
				res.redirect('/login');
				}
            else{
                console.log(result);
				req.session.uniqueId = user_name;
				
				
				if(!req.session.uniqueId) {
				console.log("Not Login");
				res.redirect('/login');
				}else {
				res.redirect('/rtc');
				console.log("Login");

				}
            }	
    db.close();
  });
});
});



//insert
app.post('/createuseradmin', function(req, res) {

  var NAME=req.body.NAME;
  var PASSWORD=req.body.PASSWORD;
  var ADDRESS=req.body.ADDRESS;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = { NAME: NAME, PASSWORD: PASSWORD, ADDRESS: ADDRESS };
  db.collection("login").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});  

});







var dt = require('./cake');
console.log(dt.myDateTime()); // => 'function'
console.log(dt.myword()); // => 'function'
	
var person = require('./person.js');

var person1 = new person('James', 'Bond');

console.log(person1.fullName());

require('./link.js').make("data", "kata", app);
require('./link.js').makedata("data", "kata", app);






app.get('/dashboard', function(req, res) {
if(!req.session.uniqueId) {
	return res.status(401).send();
}else {

console.log("Login");

}	
return res.status(200).send("welcome");

});

//Untuk menggunakan extensi yang berbeda
	
app.use(express.static(__dirname + '/demos'));	
	
	
	
	
	
	
	


app.listen(9001,function(){
  console.log("Started on PORT 9001");
}) 
