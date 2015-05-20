/**
 * Created by sebastian on 17.05.15.
 */

var express = require('express');
var db = require('../data/db-rethink');

var router = express.Router();

router.post('/login', function(request, response, next) {

});

router.post('/logout', function(request, response, next) {

});

// get current session info
router.get('/', function(request, response, next) {

});

module.exports = router;