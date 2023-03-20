const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    const sql = 'SELECT * FROM new_table';
  
    connection.query(sql, (err, result) => {
      if (err) throw err;
  
      res.render('index', { data: result });
    });
  });


  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });