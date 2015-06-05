/**
 * Created by sebastian on 11.05.15.
 */
require('../models/entities');

var express = require('express');
var db = require('../data/db-rethink');

var multiparty = require('multiparty');
var util = require('util');

var router = express.Router();

var listAllDocs = function(request, response) {

};

router.post('/', function (request, response) {

    var form = new multiparty.Form();
    form.parse(request, function(err, fields, files) {



        response.json(util.inspect({ errors: err, fields: fields, files: files }, { depth: null, colors: true }));
    });

 /*   var document = request.body;

    db.addDocument(document, function (err) {
        if(err) {
            response.json({ type: false, data: 'Error: ' + err });
        } else {
            response.json({ type: true, data: 'OK' });
        }
    })*/
});


module.exports = router;

