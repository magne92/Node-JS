var mysql = require('mysql');
var express = require('express');
var app = express();

app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) { 
    //connect database
    //var con = mysql.createConnection({
        //host: "localhost",
        //user: "root",
        //password: "",
        //database: "test"
    //}); 

    res.render('index', { 

    });
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})