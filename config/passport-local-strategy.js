const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const admin = require('../modal/adminauth');


passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback:true
    },function(req,email,password,done){
        admin.findOne({email:email},function(err,user){
            if(err){
                console.log("error ",err);
                return done(err);
            }
            if(!user||user.password!=password||user.adminid=="na"){
              console.log('password incorrect');
              return done(null,false);
            }
            return done(null,user);
        });
    }
));




passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    admin.findById(id,function(err,user){
        if(err){
            console.log('error ii deserializer');
            return done(err);
        }
        return done(null,user);
    });
});



passport.checkAuthenticate = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
    
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;

    }
    next();
}

module.exports = passport;