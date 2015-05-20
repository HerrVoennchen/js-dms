require('../models/users');

var express = require('express');
var db = require('../data/db-rethink');

var router = express.Router();

router.get('/', function (request, response) {
    response.json({ availableAdministrationServices: ['users'] });
});


//### USERS ################################################

router.get('/users', function(request, response) {
    db.listAllUser(function(err, list) {
        if(err) {
            response.json({ type: false, data: 'Error: ' + err });
        } else {
            list.sort(function(a, b) {
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;

                return 0;
            });

            response.json(list);
        }
    });
});

router.post('/users', function(request, response) {
    var userToAdd = request.body;

    db.addUser(userToAdd, function(err) {
        if(err) {
            response.json({ type: false, data: 'Error: ' + err });
        } else {
            response.json({ type: true, data: 'OK' });
        }
    });
});

router.post('/users/:id', function(request, response) {
    var userToUpdate = request.body;
    db.updateUser(userToUpdate, function(err) {
        if(err) {
            response.json({ type: false, data: 'Error: ' + err });
        } else {
            response.json({ type: true, data: 'OK' });
        }
    });
});

router.get('/users/:id', function (request, response) {
    var id = request.params.id;
    db.getUser(id, function(err, resObj) {
        if(err) {
            response.json({ type: false, data: 'Error: ' + err });
        } else {
            response.json(resObj);
        }
    });
});

var deleteUserFunction = function(request, response) {
    var id = request.params.id;
    db.deleteUser(id, function(err) {
        if(err) {
            response.json({ type: false, data: 'Error: ' + err });
        } else {
            response.json({ type: true, data: 'OK' });
        }
    });
};

router.post('/users/delete/:id', deleteUserFunction);
router.delete('/users/:id', deleteUserFunction);


//### document types ####################################




module.exports = router;