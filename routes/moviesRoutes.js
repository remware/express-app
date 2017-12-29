var express = require('express');
var moviesRouter = express.Router();
//var sql = require('mssql');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;

var router = function(nav) {

            
    moviesRouter.route('/').get(
        function(req, res) {
           // var request = new sql.Request();
           var url = 'mongodb://localhost:27017';
           var dbName = 'catalogapp';

            //request.query('select * from movies', function(err, r) {... r.recordset})

            mongodb.connect(url, function(err, client) {
                if (err !== null) {
                    console.log("Error connecting to server ", err);
                }                
                var db = client.db(dbName);
                var collection = db.collection('movies');
                collection.find({}).toArray(
                    function(err, results) {
                     
                        res.render('movies', 
                        {
                            title: 'Movies',
                            nav: nav,
                            movies: results
                        });
                });
            });
                      
        }
      );

    var findMovies = function(db, id, callback) {
        var collection = db.collection('movies');
        collection.find({_id: id}).toArray(function(err, docs){
            if (err !== null) {
                console.log("Error reading movies ", err);
            }
            callback(docs);                      
        });                
    };  

    moviesRouter.route('/:id')
        .get(function (req, res) {
           
            var id = new objectId(req.params.id);
            //var ps= new sql.PreparedStatement();
            //ps.input('id', sql.Int);
            //ps.prepare('select * from movies where id= @id',
            var url = 'mongodb://localhost:27017';
            var dbName = 'catalogapp';           
             //request.query('select * from movies', function(err, r) {... r.recordset})
             mongodb.connect(url, function(err, client) {
                 if (err !== null) {
                     console.log("Error connecting to server ", err);
                 }                
                 var db = client.db(dbName);                
                 findMovies(db, id, function(result) {
                    console.log("result ", result);
                    res.render('movieView', 
                     {
                         title: 'Movie selected',
                         nav: nav,
                         movies: result[0]
                     });
                 });
                
             }); 
        });    

    return moviesRouter;

};

module.exports = router;
