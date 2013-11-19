
exports.index = function(req, res){
  var model = {
    title: 'vision.', 
    description: 'a project based dashboard for github', 
    author: 'airasoul',
    user: req.isAuthenticated() ? req.user.displayName : '',
    csrftoken: req.session._csrf
  };

  res.render('index', model);
};
