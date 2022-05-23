var GoogleStrategy = require("passport-google-oauth20").Strategy;
var GitHubStrategy = require("passport-github2").Strategy;
var passport = require("passport");
var UserModel = require("./models/UserModel");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:3001/passport/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      var newUser = {
        email: profile.emails[0].value,
        username: profile.emails[0].value,
      };

      UserModel.find(newUser, function (err, user) {
        if (user.length === 0) {
          UserModel.create(newUser);
        }
        return cb(err, newUser);
      });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3001/passport/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      var newUser = {
        username: profile.username,
      };
      profile._json.email !== null && (newUser.email = profile._json.email);
      UserModel.find(newUser, function (err, user) {
        if (user.length === 0) {
          UserModel.create(newUser);
        }
        return done(err, newUser);
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
