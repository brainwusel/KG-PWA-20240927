const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

const port = 3000;


var key = fs.readFileSync('./certs/selfsigned.key');
var cert = fs.readFileSync('./certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};


// We want to use JSON to send post request to our application
app.use(bodyParser.json());

// We tell express to serve the folder public as static content
app.use(express.static('public',{ maxAge: '300'}));

// app.get('/public');    


const server = https.createServer(options, app);
server.listen(port, () => console.log(`Listening on port ${port}!`));