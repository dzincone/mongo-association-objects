var express = require('express');
var router = express.Router();
var people = require('../02_people_and_addresses')

/* GET home page. */
router.get('/', function(req, res, next) {
  people.getPeople().then(function(people){
    res.render('index', { title: 'Express', people: people});
  })
});

module.exports = router;
