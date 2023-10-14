var mysql = require('mysql');

var express = require('express');
var app = express();

app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

var potet = "potet";

app.get('/', function (req, res) {
   console.log("got a request for /");

   res.render('index2', {

      potet: potet

 });
})

app.get('/api', function(req, res) {
    res.send('this is the response');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})