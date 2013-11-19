exports.addToken = function(req, res, next){

  if (req.isAuthenticated()) {
    req.body.user = req.session.passport.user.id;
    req.body.token = req.session.passport.user.token;
    req.user = req.session.passport.user;
  };

  next();
}