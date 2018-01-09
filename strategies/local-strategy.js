var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function ()  {
    passport.use(new LocalStrategy(
        {
        usernameField: 'userName',
        passwordField: 'password'
        },
        function(username, password, done){

            var url = 'mongodb://localhost:27017';
            var dbName = 'catalogapp';
            
            mongodb.connect(url, function(err, client) {
                if (err !== null) {
                    console.log("Error connecting to server ", err);
                }
                
                var db = client.db(dbName);
                var collection = db.collection('users');              
               
                collection.findOne({'username': username}, function(err, results) {
                    var user =results;
                    done(null, user);
                });
                console.log("user ", user);
            });

            
            if (!user.verifyPassword(password)) { return done(null, false); }

            return done(null, user);
        }) );    
};
