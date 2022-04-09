module.exports.requireAuth = function(req, res, next){
    if (req.session.username) {
        next();
    } else {
        res.redirect('/users/login');
        // res.render('login');
    }
  };