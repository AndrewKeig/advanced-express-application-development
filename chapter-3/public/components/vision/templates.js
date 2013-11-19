this["visiontemplates"] = this["visiontemplates"] || {};

this["visiontemplates"]["templates/commits.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <a class=\"pull-left\" href=\"#\">\n    <img class=\"media-object\" src=\"";
  if (stack1 = helpers.avatar_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.avatar_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"width:64px; height:64px\">\n  </a>\n  <div class=\"media-body\">\n    <h4 class=\"media-heading\">";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n    <small>";
  if (stack1 = helpers.repository) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.repository; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n    <small>";
  if (stack1 = helpers.ago) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ago; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n    <br/><small>";
  if (stack1 = helpers.login) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.login; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n  </div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.login, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["visiontemplates"]["templates/issues.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<a class=\"pull-left\" href=\"#\">\n<img class=\"media-object\" src=\"";
  if (stack1 = helpers.avatar_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.avatar_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"width:64px; height:64px\">\n</a>\n<div class=\"media-body\">\n<h4 class=\"media-heading\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n<small>";
  if (stack1 = helpers.repository) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.repository; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n<small>";
  if (stack1 = helpers.ago) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ago; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n<br/><small>";
  if (stack1 = helpers.login) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.login; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ",  <b>";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</b></small>\n</div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.login, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["visiontemplates"]["templates/project-form.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form class=\"form-inline\">\n  <ul class=\"errors help\"></ul> \n  <label>name</label> <input class=\"name\" placeholder=\"project name\" required=\"required\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" autofocus />\n  <br/><button class=\"cancel btn btn-mini btn-primary form-btn\">cancel</button>\n  <button class=\"save btn btn-mini btn-primary form-btn form-spacer\">save</button>\n</form>";
  return buffer;
  });

this["visiontemplates"]["templates/projects.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-id=\"";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n<button class=\"delete btn btn-mini btn-primary list-btn\">del ⌫</button>\n<button class=\"edit btn btn-mini btn-primary list-btn spacer \">edit e</button>";
  return buffer;
  });

this["visiontemplates"]["templates/repositories.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n  <label class=\"checkbox inline\">\n  <input id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" type=\"checkbox\" ";
  if (stack1 = helpers.enabled) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.enabled; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><h4 class=\"media-heading repoItem\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n  <small>";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</small>\n  </label>\n</li>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.id, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });