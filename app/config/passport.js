const users = require('./users')

// config/passport.js
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Example user data (replace with your own user data model)


// JWT strategy configuration
const jwtOptions = {
  secretOrKey: 'your-secret-key',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    const user = users.find((user) => user.id === jwtPayload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  })
);

module.exports = passport;
