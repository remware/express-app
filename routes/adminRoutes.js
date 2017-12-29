var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var mongoMovies = [
    {
      title: 'Unlocked',
      genre: 'Action Thriller',
      director: 'Michael Apted',
      watched: true 
    },
    {
      title: 'The Little Prince',
      genre: 'Children Animation',
      director: 'Mark Osborne',
      watched: true 
    }
  ];

var seedMovies = function(db, callback) {
    var collection = db.collection('movies');
    collection.insertMany(mongoMovies, function( err, result){     
                if (err !== null) {
                    console.log("Error inserting to movies ", err);
                }
                console.log("result before call ", result);
                callback(result);                      
            });

};

var router = function(nav) {

    adminRouter.route('/addMovies')
    .get( function (req, res) {
        var url = 'mongodb://localhost:27017';
        var dbName = 'catalogapp';
        
        mongodb.connect(url, function(err, client) {
            if (err !== null) {
                console.log("Error connecting to server ", err);
            }
            
            var db = client.db(dbName);
            seedMovies(db, function(result) {
                res.status(201).send(result);
                client.close();
            });
            
        });

      
    });

    return adminRouter;
    
};

module.exports = router;
