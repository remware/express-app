var express = require('express');
var moviesRouter = express.Router();

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
          res.render('movies', 
          {
            title: 'Movies',
            nav: nav,
            movies: movies
          });
        }
      );
      
    moviesRouter.route('/:id').get(
        function(req, res) {
            var id = req.params.id;
            res.render('movieView', 
            {
              title: 'Movie selected',
              nav: nav,
              movies: movies[id]
            });      
        }
      );    

return moviesRouter;

};



  module.exports = router;
