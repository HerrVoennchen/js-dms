var r = require('rethinkdb');
var config = require('../config/config.json');


exports.listAllUser = function(callback) {
    r.connect({ host: config.database.server, port: config.database.port }, function(err, conn) {
        if(err) throw err;

        r.db(config.database.dbname).table('users').run(conn, function(err, res) {

            res.toArray(function(err, docs) {
                callback(err, docs);
                conn.close(function(err) { if (err) throw err; });
            });
        });
    });
};


exports.addUser = function(userObject, callback) {
    r.connect({ host: config.database.server, port: config.database.port }, function(err, conn) {
        if(err) throw err;

        r.db(config.database.dbname).table('users').insert(userObject).run(conn, function(err, res) {
            callback(err);
            conn.close(function(err) { if (err) throw err; });
        });
    });
}
;

exports.updateUser = function(userObject, callback) {
    r.connect({ host: config.database.server, port: config.database.port }, function(err, conn) {
        if(err) throw err;

        r.db(config.database.dbname).table('users').update(userObject).run(conn, function(err, res) {
            callback(err);
            conn.close(function(err) { if (err) throw err; });
        });
    });
};

exports.getUser = function (id, callback) {
    r.connect({ host: config.database.server, port: config.database.port }, function(err, conn) {
        if (err) throw err;

        r.db(config.database.dbname).table('users').get(id).run(conn, function(err, res) {
            callback(err, res);
            conn.close(function(err) { if (err) throw err; });
        });
    });
}

exports.deleteUser = function(id, callback) {
    r.connect({ host: config.database.server, port: config.database.port }, function(err, conn) {
        if (err) throw err;

        r.db(config.database.dbname).table('users').get(id).delete().run(conn, function(err, res) {
            callback(err);
            conn.close(function(err) { if (err) throw err; });
        });
    });
};

exports.searchDocs = function (docObj, callback) {
    r.connect({ host: config.database.server, port: config.database.port }, function(err, conn) {
        if(err) throw err;


    });
};

exports.addDocument = function (document, callback) {
    r.connect({ host: config.database.server, port: config.database.port }, function(err, conn) {
        if(err) throw err;

        r.db(config.database.dbname).table('documents').insert(document).run(conn, function(err, res) {
            callback(err);
            conn.close(function(err) { if (err) throw err; });
        });
    });
};