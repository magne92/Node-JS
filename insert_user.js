

app.post('/signup', (req, res) => {

    var con = mysql.createConnection({host:"mysql.database.azure.com", user:"azureuser", 

    password:"Passord", database:"db", port:3306, ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}});

    
    var brukernavn = req.body.brukernavn;
    var email = req.body.email;
    var passord = req.body.passord;

    var sql = `INSERT INTO brukere (brukernavn, email, passord) VALUES (?, ?, ?)`;
    var values = [brukernavn, email, passord];

    con.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('User inserted into database');
        
        res.render('login.ejs');

    });

});



app.post('/login', function (req, res) {

    // hent brukernavn og passord fra skjema på login
    var brukernavn = req.body.brukernavn;
    var passord = req.body.passord;

    // perform the MySQL query to check if the user exists
    var sql = 'SELECT * FROM brukere WHERE brukernavn = ? AND passord = ?';
    
    con.query(sql, [brukernavn, passord], (error, results) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else if (results.length === 1) {
            session = req.session;
            session.userid=req.body.username; // set session userid til brukernavn
            res.redirect('/profile');

        } else {
            res.redirect('/login?error=invalid'); // redirect med error beskjed i GET
        }
    });
});