const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function(_id, done) {
//   User.findById(_id, function(err, user) {
//     done(err, user);
//   }).lean();
// });

// passport.use(new LocalStrategy({usernameField: 'email'},
//   function(email, password, done) {
//     User.findOne({ email: email }, async function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect email or second name.' });
//       }
//       if (!(await bcrypt.compare(password, user.password))) {
//         return done(null, false, { message: 'Incorrect password.' });
//       } 
//       return done(null, user);
//     }).lean();
//   }
// ));

const options ={
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret_key',
};

passport.use(new JWTstrategy(options, function(payload, done) {
  User.findOne({id: payload.sub}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
  });
}));