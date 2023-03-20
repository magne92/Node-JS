const mysql = require('mysql');
const express = require('express');
const app = express();

// Step 2: Establish MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

// Step 3: Retrieve data from MySQL
connection.query('SELECT * FROM new_table', (error, results) => {
  if (error) throw error;
  console.log(results); // the retrieved data

  // Step 4: Render the data on an HTML page
  app.get('/', (req, res) => {
    res.render('index.ejs', { data: results });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

