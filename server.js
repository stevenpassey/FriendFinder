var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

var app = express();
var PORT = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use("/", express.static(path.join(__dirname, 'app/public')));

require(path.join(__dirname, 'app/routing/routes.js'))(app, path);

app.listen(PORT, function() {
	console.log("Friend Finder v1.4");
});
