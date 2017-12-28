var express = require('express');
var moviesRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {

    var movies = [
        {
          title: 'Start Wars: The force awakens',
          genre: 'Science Fiction',
          director: 'George Lucas',
          watched: true 
        },
        {
          title: 'Les Misérables',
          genre: 'Historical Fiction',
          director: 'Victor Hugo',
          watched: true 
        }
      ];
            
    moviesRouter.route('/').get(
        function(req, res) {
            var request = new sql.Request();
            request.query('select * from movies',
            function(err, results) {
                    console.log("this is recordset ", results.recordset);
                    res.render('movies', 
                    {
                        title: 'Movies',
                        nav: nav,
                        movies: results.recordset
                    });
            });
           
        }
      );
      
    moviesRouter.route('/:id')
        .all(function (req, res, next) {
            var id = req.params.id;
            var ps= new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from movies where id= @id',
            function(err) {
                ps.execute({id: req.params.id},
                    function(err, results) {
                        if(results.recordset.length === 0) {
                            res.status(404).send('Not Found');
                        }
                        req.book = results.recordset[0];           
                        next();
                    });                
            });  
        })
        .get(
        function(req, res) {
            res.render('movieView', 
            {
              title: 'Movie selected',
              nav: nav,
              movies: req.book
            });  
        });    

return moviesRouter;

};



  module.exports = router;
