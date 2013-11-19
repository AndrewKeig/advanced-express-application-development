
exports.index = function(req, res){
  var model = {
    title: 'vision.', 
    description: 'a project based dashboard for github', 
    author: 'airasoul',
    user: 'Andrew Keig'
  };

  res.render('index', model);
};
