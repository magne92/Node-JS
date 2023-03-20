const http = require('http');
const fs = require('fs').promises;

const hostname = '127.0.0.1';
const port = 3000;


const requestListener = function (req,res) {
    fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html")
            res.writeHead(200)
            res.end(contents)
        })
};

const server = http.createServer(requestListener);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

