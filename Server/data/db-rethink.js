var config = require('../config/config.json');
var r = require('rethinkdbdash')({ servers: config.database.hosts });

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

};

exports.addDocument = function (document, callback) {
    r.db(config.database.dbname).table('documents').insert(document).run(function(err, res) {
        callback(err);
    });
};