var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Sponsor = require('./app/models/Sponsor')

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/giveawayDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '[mongoose] connection error'));
db.once('open', function() {

});

var port = process.env.PORT || 8080;

var router = express.Router();

// Default route - hits every time
router.use(function(req, res, next) {
  console.log("api requested from; name=" + req.body.name);
  next();
});

// root route
router.get('/', function(req, res) {
  res.json({ message: 'ahoy there'});
});

/*
    @params req: name
*/
router.route('/sponsors') 
    .get(function(req, res) {
        Sponsor.find(function(err, sponsors) {
            if (err) { 
                res.send('err' + err);
            }
            console.log("get: " +  sponsors);
            res.json(sponsors);
        });
    });


app.use('/api', router);

app.listen(port);
console.log('listening on port' + port);
