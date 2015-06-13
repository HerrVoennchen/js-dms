/**
 * Created by sebastian on 12.06.15.
 */
var config = require('../../config/config.json');

var fs = require('fs');
var path = require('path');
var util = require('util');

var _FS_IS_READY = false;
var _ABS_CACHEDIR = path.normalize(config.directories.documentCache);

exports.init = function () {
    if(_ABS_CACHEDIR) {
        fs.stat(_ABS_CACHEDIR, function(err, stats) {
            if(!stats) {
                fs.mkdir(_ABS_CACHEDIR, function () {
                    _FS_IS_READY = true;
                });
            }
        });
    }
};

exports.storeFile = function (tmpFileObj, dataObject, callback) {
    fs.stat(tmpFileObj.path, function(err, stats) {
        if(stats) {
            var newDocFilename = path.join(_ABS_CACHEDIR, dataObject.id, tmpFileObj.originalFilename);
            fs.stat(path.dirname(newDocFilename), function (err, stats) {
                if (!stats) {
                    fs.mkdirSync(path.dirname(newDocFilename));
                }

                fs.rename(tmpFileObj.path, newDocFilename, function () {
                    console.log('File to object ' + dataObject.id + ' stored');
                    callback(newDocFilename.replace(_ABS_CACHEDIR, ""));
                });
            });
        }
    });
};

exports.updateFile = function(dataObject) {

};

exports.deleteFile = function (dataObject) {

};