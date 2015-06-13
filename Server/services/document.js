/**
 * Created by sebastian on 11.05.15.
 */

var classes = require('../models/entities');
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

        var document = new classes.Document();
        document.name = fileObj.originalFilename;

        var file = new classes.FileInfo();
        file.filename = fileObj.originalFilename;
        file.extraData = dataObj;
        file.size = fileObj.size;

        console.log(util.inspect(document));

        db.addDocument(document, function(err, res) {
            if(err) {
                response.json({ type: false, data: 'Error: ' + err });
            } else {
                if(res.generated_keys) {
                    document.id = res.generated_keys[0];

                        console.log('store file');
                    fs_data.storeFile(fileObj, document, function (newFilename) {

                        // file info anlegen und verknüpfen
                        db.addFileInfo(file, function(err, res) {
                            if(res.generated_keys) {
                                document.fileInfoId = res.generated_keys[0];
                                db.updateDocument({ id: document.id, fileInfoId: document.fileInfoId }, function (err, res) {
                                    if(err) {
                                        response.json({ type: false, data: 'Error: ' + err });
                                    } else {
                                        response.json({
                                            storedFile: newFilename,
                                            document: util.inspect(document),
                                            status: "OK"
                                        });
                                    }
                                });
                            } else {
                                response.json({
                                    type: false,
                                    data: 'object cannot be created',
                                    fileinfo: util.inspect(file)
                                });
                            }
                        });
                    });
                } else {
                    response.json({type: false, data: 'object cannot be created', document: util.inspect(document)});
                }
            }
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

