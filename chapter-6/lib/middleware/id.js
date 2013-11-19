exports.validate = function(req, res, next, id){
  if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.json(400, 'Bad Request');
  next();
}