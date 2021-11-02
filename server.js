// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// A request to /api/:date? with a valid date should return a JSON object
// with a unix key that is a Unix timestamp of the input date in milliseconds
app.use("/api/:date", function (req, res) {
  if (new Date(req.params.date*1000) != "Invalid Date" && /^[0-9]*$/.test(req.params.date)) {
    const convertDate = new Date(parseInt(req.params.date));
    console.log(`${parseInt(req.params.date)} converts to ${convertDate}`);
    const utcDate = convertDate.toUTCString();
    res.json({unix: req.params.date, utc: utcDate});
  } else if (new Date(req.params.date) != "Invalid Date") {
    const convertDate = new Date(req.params.date);
    console.log(`${req.params.date} converts to ${convertDate}`);
    const unixDate = convertDate.getTime();
    const utcDate = convertDate.toUTCString();
    res.json({unix: unixDate, utc: utcDate});
  } else {
    res.json({ error : "Invalid Date" });
  }
});

app.use("/api/", function (req, res) {
  console.log("current Date chosen");
  const currDate = new Date();
  const unixDate = currDate.getTime();
  const utcDate = currDate.toUTCString();
  res.json({unix: unixDate, utc: utcDate});
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
