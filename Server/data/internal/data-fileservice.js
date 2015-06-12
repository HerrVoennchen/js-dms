/**
 * Created by sebastian on 12.06.15.
 */
var config = require('../../config/config.json');
var fs = require('fs');
var path = require('path');

var _FS_IS_READY = false;
var _ABS_CACHEDIR = path.normalize(config.directories.documentCache);

exports.init = function () {
    if(_ABS_CACHEDIR && !fs.existsSync(_ABS_CACHEDIR)) {
        fs.mkdir(_ABS_CACHEDIR, function () {
            _FS_IS_READY = true;
        });
    }
};

exports.storeFile = function (tmpFileObj, dataObject, callback) {
    fs.exists(tmpFileObj.path, function() {
        var newDocFilename = path.join(_ABS_CACHEDIR, dataObject.id, tmpFileObj.originalFilename);
        if(!fs.existsSync(path.dirname(newDocFilename))) {
            fs.mkdir(path.dirname(newDocFilename));
        }

        fs.rename(tmpFileObj.path, newDocFilename, function() {
            console.log('File to object ' + dataObject.id + ' stored');
            callback(newDocFilename);
        });
    });
};

exports.updateFile = function(dataObject) {

};

exports.deleteFile = function (dataObject) {

};