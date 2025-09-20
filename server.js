// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource-sharing)
// so that your API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// This is needed to get the user's IP address correctly when behind a proxy,
// which is common on hosting platforms.
app.enable('trust proxy');

// http://expressjs.com/en/starter/static-files.html
// Serve static files (like CSS) from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
// Serve the index.html file for the root route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});


// API endpoint for parsing the request header
app.get("/api/whoami", function (req, res) {
  // The 'req' object contains all the information about the incoming request.
  // We can access headers and other connection details from it.
  
  res.json({
    ipaddress: req.ip, // req.ip gets the user's public IP address.
    language: req.headers["accept-language"], // The "Accept-Language" header.
    software: req.headers["user-agent"] // The "User-Agent" header.
  });
});


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

