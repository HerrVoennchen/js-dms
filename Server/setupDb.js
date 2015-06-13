/**
 * Created by sebastian on 13.06.15.
 */
var config = require('./config/config.json');
var r = require('rethinkdbdash')({ servers: config.database.hosts });

r.dbCreate(config.database.dbname).run(function() {
    console.log('DB OK');
    r.db(config.database.dbname).tableCreate('users').run(function () {
        console.log('users OK');
    });

    r.db(config.database.dbname).tableCreate('documents').run(function () {
        console.log('documents OK');
    });

    r.db(config.database.dbname).tableCreate('fileinfo').run(function () {
        console.log('fileinfo OK');
    });
});