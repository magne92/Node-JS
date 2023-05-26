var mysql = require('mysql');
var express = require('express');
var app = express();

app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
   
   var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "test"
   });
   
   con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM new_table", function (err, result, fields) {
         if (err) throw err;
         console.log(result);     
         var data = result; 
   
      });
   });
})

var myusername = "per";
var mypassword = "123";

app.post('/user',(req,res) => {

    if(req.body.username == myusername && req.body.password == mypassword){
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
        res.send({
            login_id: myusername
         });
    }
    else{
        res.send({
            login_id: false
         });
    }
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})