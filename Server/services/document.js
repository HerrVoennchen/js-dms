/**
 * Created by sebastian on 11.05.15.
 */
require('../models/entities');

var express = require('express');
var db = require('../data/db-rethink');

var multiparty = require('multiparty');
var util = require('util');

var fs_data = require('../data/internal/data-fileservice');

var router = express.Router();

fs_data.init();

var listAllDocs = function(request, response) {

};

router.post('/', function (request, response) {

    var form = new multiparty.Form();
    form.parse(request, function(err, fields, files) {

        var fileObj = files.file[0];
        var dataObj = JSON.parse(fields.objectData[0]);

        var document = new Document();
        document.name = fileObj.originalFilename;

        var file = new File();
        file.filename = fileObj.originalFilename;
        file.extraData = dataObj;
        file.size = fileObj.size;

        document.files.add(file);

        db.addDocument(document, function(err, res) {
            console.log('store file');
            fs_data.storeFile(fileObj, res, function(newFilename) {
                response.json({ storedFile:newFilename, documentId:util.inspect(res), status:"OK" });
            });
        });
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

