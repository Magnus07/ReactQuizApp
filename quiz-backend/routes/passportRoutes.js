var express = require("express");
var router = express.Router();
var passport = require("passport");
var userModel = require("../models/UserModel");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    userModel.findOne(req.session.passport.user, function (err, user) {
      if (user) {
        req.session.user = user;
      }
      delete req.session.passport;
      res.redirect("http://localhost:3000");
    });
  }
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", succeessRedirect : "http://localhost:3000" }),
  async function (req, res) {
    // Successful authentication, redirect home.
    userModel.findOne(req.session.passport.user, function (err, user) {
      if (user) {
        req.session.user = user;
      }
      delete req.session.passport;
      res.redirect("http://localhost:3000");
    });
  }
);

module.exports = router;
