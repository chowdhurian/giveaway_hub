var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('your post is:\n');
//   res.end(JSON.stringify(req.body, null, 2));
//   console.log('you are using gen');
// });

mongoose.connect('mongodb://localhost/giveawayDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '[mongoose] connection error'));
db.once('open', function() {

});

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
  console.log("api requested from; name=" + req.body.name);
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'ahoy there'});
});

app.use('/api', router);

app.listen(port);
console.log('listening on port' + port);
