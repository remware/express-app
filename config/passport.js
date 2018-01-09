var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser( function(user, done) {
        done(err, user.id);
    });
    passport.deserializeUser( function(userId, done){
        // mongoDb
        done(null, user);
    });

    //strategy passport-local
    require('../strategies/local-strategy')();

};

