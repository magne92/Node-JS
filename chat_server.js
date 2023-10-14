const express = require('express');
const path = require('path');
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24; // calculate one day

const app = express();

app.use(express.urlencoded({ extended: true })); // må brukes for å ta imot form data
app.use(express.static('public'));
app.use(express.json());

var messages = [];
var session;
var msg_to_send;
var users = [
    { username: 'magne', password: 123 }, 
    { username: 'bente', password: 123 }, 
    { username: 'per', password: 123 } 
    ]

// express app should use sessions
app.use(sessions({
    secret: "thisismysecrctekeyfhgjkgfhkgfjlklkl",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

function checkCredentials(submittedUsername, submittedPassword) {
    const user = users.find(u => u.username === submittedUsername);
    console.log(user.password)
    console.log(submittedPassword)

    if (user && user.password == submittedPassword) {
        console.log('User authenticated successfully!');
        return true;
    } else {
        console.log('Invalid username or password!');
        return false;
    }
}


app.get('/', (req, res) => {
    session=req.session;
    if(session.username){
        res.sendFile(path.join(__dirname, 'public', 'chat.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'chat_login.html'));
    }
});

app.post('/login', (req,res) => {
    //console.log(req)
    console.log("attempted login: ",req.body.username, req.body.password)
    if (checkCredentials(req.body.username, req.body.password)) {
        session = req.session;
        session.username = req.body.username;
        console.log("New session made: ", req.session)
        res.sendFile(path.join(__dirname, 'public', 'chat.html'));
    } else {
        res.json({message: "wrong username or password"})
    }
})


app.post('/messages', (req, res) => {
    var amount = parseInt(req.body.messages_loaded);
    console.log("amount from client: ",amount)
   /*  if (amount == 0) {
        msg_to_send = Array.from(messages)
    }
    else {
        msg_to_send = Array.from(messages)
        msg_to_send.splice(0,amount)
    } */

    //console.log("msg to send: ", msg_to_send)
    res.json(messages);
});

app.post('/add_msg', (req, res) => {
    var message = req.body.message;
    //console.log("Message recieved: ", message);

    if (message && req.session.username) {
        messages.push(req.session.username + ": " + message);
        console.log("all messages: ", messages)
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "no message"});
    }
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});