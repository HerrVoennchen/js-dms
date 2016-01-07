console.log('Service is starting up ...');

var config = require('./config.json');

var cluster = require('cluster');
var numCPUs = 1;//require('os').cpus().length;

if (cluster.isMaster && false) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

} else {

    var express = require('express');
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var helmet = require('helmet');

    var service_admin = require('./services/administration');
    var service_document = require('./services/document');
    var service_session = require('./services/session');

    var server = express();
    server.use(bodyParser.json()); // for parsing application/json
    server.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    server.use(cors()); // allow requests from different domains/origins
    server.use(helmet()); // some extra security

    server.use('/administration', service_admin);
    server.use('/documents', service_document);
    server.use('/session', service_session);

    server.get('/', function (request, response) {
        response.json({availableServices: ['administration', 'documents', 'session']});
    });

    /*
     server.use(function (req, res, next) {

     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);

     // Pass to next layer of middleware
     next();
     });
     */

    server.use(function (error, request, response, next) {
        response.status(error.status || 500);
        response.json({error: error.message});
    });

    var port = process.env.PORT || config.port;

    var running = server.listen(port, function () {
        var host = running.address().address;
        var port = running.address().port;

        console.log('Service is up and running on http://%s:%s', host, port);
    });

    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    });
}