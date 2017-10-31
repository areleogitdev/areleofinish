
function make(Schema, mongoose, app) {
    // Define Car model
	
	console.log(Schema+mongoose);
	app.get('/updateadmin',function(req,res){
  res.sendfile("demos/admin/updateadmin.html");
});
	
	
}


function makedata(Schema, mongoose, app) {
    // Define Car model

app.get('/login',function(req,res){
  res.sendfile("demos/loginr.html");
});

app.get('/testdata',function(req,res){
  res.sendfile("demos/test.html");
});	

app.get('/insertdata',function(req,res){
  res.sendfile("demos/insert.html");
});

app.get('/updatedata',function(req,res){
  res.sendfile("demos/update.html");
});

app.get('/deletedata',function(req,res){
  res.sendfile("demos/delete.html");
});

//admin
app.get('/createadmin',function(req,res){
  res.sendfile("demos/admin/createadmin.html");
});

app.get('/readadminr',function(req,res){
  res.sendfile("demos/admin/readadmin.html");
});	

app.get('/updateadmin',function(req,res){
  res.sendfile("demos/admin/updateadmin.html");
});

app.get('/deleteadmin',function(req,res){
  res.sendfile("demos/admin/deleteadmin.html");
});


app.get('/createuseradmin',function(req,res){
  res.sendfile("demos/admin/createuseradmin.html");
});

app.get('/loginadmin',function(req,res){
  res.sendfile("demos/admin/loginadmin.html");
});





app.get('/dashboardadmin',function(req,res){
  res.sendfile("demos/admin/dashboard.html");
});



	
	
}

module.exports.make = make;
module.exports.makedata = makedata;