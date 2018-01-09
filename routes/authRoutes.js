var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function() {

    authRouter.route('/signUp')
    .post( function (req, res) {
              
        var url = 'mongodb://localhost:27017';
        var dbName = 'catalogapp';
        
        mongodb.connect(url, function(err, client) {
            if (err !== null) {
                console.log("Error connecting to server ", err);
            }
            
            var db = client.db(dbName);
            var collection = db.collection('users');
            var user = {
                username: req.body.userName,
                password: req.body.password
            };
            console.log("user ", user);
            collection.insert(user, function(err, results) {
                req.login(results.ops[0], function() {
                    res.redirect('/Auth/profile');
                }); 
            });
        });
      
    });

    authRouter.route('/singIn')
    .post(passport.authenticate('local', {
            failureRedirect: '/' } ), 
                function(req, res) {
                    res.redirect('/Auth/profile');
    });

    authRouter.route('/profile')
        .get(function(req, res){
            res.json(req.user);
            console.log(" profile ", req.user);
        });

    return authRouter;
    
};

module.exports = router;
