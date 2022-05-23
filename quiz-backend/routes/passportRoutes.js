var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    // console.log(req);
    req.session.user = req.session.passport.user;
    delete req.session.passport;
    res.redirect("/");
  }
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.session.user = req.session.passport.user;
    delete req.session.passport;
    res.redirect("/");
  }
);

module.exports = router;
