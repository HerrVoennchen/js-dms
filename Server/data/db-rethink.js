var config = require('../config.json');
var r = require('rethinkdbdash')({ servers: config.database.hosts });
var util = require('util');

exports.listAllUser = function(callback) {
    r.db(config.database.dbname).table('users').run(function(err, res) {
        callback(err, res);
    });
};


exports.addUser = function(userObject, callback) {
    r.db(config.database.dbname).table('users').insert(userObject).run(function(err, res) {
        callback(err);
    });
}
;

exports.updateUser = function(userObject, callback) {
    r.db(config.database.dbname).table('users').update(userObject).run(function(err, res) {
        callback(err);
    });
};

exports.getUser = function (id, callback) {
    r.db(config.database.dbname).table('users').get(id).run(function(err, res) {
        callback(err, res);
    });
}

exports.deleteUser = function(id, callback) {
    r.db(config.database.dbname).table('users').get(id).delete().run(function(err, res) {
        callback(err);
    });
};

exports.searchDocs = function (docObj, callback) {
    r.db(config.database.dbname).table('documents').run(function(err, res) {
        callback(err, res);
    });
};

exports.addDocument = function (document, callback) {
    r.db(config.database.dbname).table('documents').insert(document).run(function(err, res) {
        //console.log(util.inspect(err));
        //console.log(util.inspect(res));
        callback(err, res);
    });
};

exports.updateDocument = function (document, callback) {
    r.db(config.database.dbname).table('documents').update(document).run(function(err, res) {
        callback(err, res);
    });
};

exports.addFileInfo = function(fileInfo, callback) {
    r.db(config.database.dbname).table('fileinfo').insert(fileInfo).run(function(err, res) {
        callback(err, res);
    });
};