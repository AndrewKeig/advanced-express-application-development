var Vision = Vision || {};

Backbone.View.prototype.event_aggregator = _.extend({}, Backbone.Events);

Backbone.sync = (function(original) {
  return function(method, model, options) {
    options.beforeSend = function(xhr) {
      var token = $("meta[name='csrf-token']").attr('content');
      xhr.setRequestHeader('X-CSRF-Token', token);
    };
    original(method, model, options);
  };
})(Backbone.sync);


Vision.Issue = Backbone.Model.extend({
  defaults: {
    title : '',
    state : '',
    date : '',
    ago: '',
    login : '',
    avatar_url : ''
  }
});

Vision.IssueList = Backbone.Collection.extend({
  projectId: '',
  model: Vision.Issue,

  url : function() {
    return '/project/' + this.projectId + '/issues';
  },

  initialize: function(items, item) {
    this.projectId = item.projectId;
  },

  parse: function( response ) {
    response.id = response._id;
    return response;
  }
});

Vision.IssueView = Backbone.View.extend({
  tagName: 'li',
  className: 'media',
  viewTemplate: visiontemplates['templates/issues.hbs'],

  render: function () {
    this.$el.html(this.viewTemplate(this.model.toJSON()));
    return this;
  }
});

Vision.IssueListView = Backbone.View.extend({
  Issues: [],

  initialize: function (args) {
    if (!args.projectId) return;
    this.Issues = args.issues || [];
    this.$el.html('');
    this.create(args);
    this.refresh();
  },

  create: function(args) {
    this.collection = new Vision.IssueList(this.Issues, { projectId : args.projectId });
    this.render();
  },

  refresh: function(){
    var me = this;

    if (!this.Issues.length) {
      this.collection.fetch({ success: function(){
          me.render();
      }});
    }
  },

  render: function () {
    _.each(this.collection.models, function (item) {
      this.add(item);
    }, this);
  },

  add: function (item) {
    var issueView = new Vision.IssueView({ model: item });

    this.$el.append(issueView.render().el);
    return issueView;
  }
});

Vision.Commit = Backbone.Model.extend({
  defaults: {
    date : '',
    ago: '',
    message : '',
    login : '', 
    avatar_url : ''
  }
});

Vision.CommitList = Backbone.Collection.extend({
  projectId: '',
  model: Vision.Commit,

  url : function() {
    return '/project/' + this.projectId + '/commits';
  },

  initialize: function(items, item) {
    this.projectId = item.projectId;
  },

  parse: function( response ) {
    response.id = response._id;
    return response;
  }
});

Vision.CommitView = Backbone.View.extend({
  tagName: 'li',
  className: 'media',
  viewTemplate: visiontemplates['templates/commits.hbs'],

  render: function () {
    this.$el.html(this.viewTemplate(this.model.toJSON()));
    return this;
  }
});

Vision.CommitListView = Backbone.View.extend({
  Commits: [],

  initialize: function (args) {
    if (!args.projectId) return;
    this.Commits = args.commits || [];
    this.$el.html('');
    this.create(args);
    this.refresh();
  },

  refresh: function(){
    var me = this;

    if (!this.Commits.length) {
      this.collection.fetch({ success: function(){
          me.render();
      }});
    }
  },

  create: function(args) {
    this.collection = new Vision.CommitList(this.Commits, { projectId : args.projectId });
    this.render();
  },

  render: function () {
    _.each(this.collection.models, function (item) {
        this.add(item);
    }, this);
  },

  add: function (item) {
    var commitView = new Vision.CommitView({ model: item });

    this.$el.append(commitView.render().el);
    return commitView;
  }
});

Vision.Repository = Backbone.Model.extend({
  defaults: {
      id : ''
    , name: ''
    , description: ''
    , enabled: ''
  }
});

Vision.RepositoryList = Backbone.Collection.extend({
  projectId: '',
  model: Vision.Repository,

  url : function() {
    return '/project/' + this.projectId + '/repos';
  },

  initialize: function(items, item) {
    this.projectId = item.projectId;
  },

  parse: function( response ) {
    response.id = response._id;
    return response;
  }
});

Vision.RepositoryView = Backbone.View.extend({
  tagName: 'li',
  viewTemplate: visiontemplates['templates/repositories.hbs'],

  render: function () {
    this.$el.html(this.viewTemplate(this.model.toJSON()));
    return this;
  }
});

Vision.RepositoryListView = Backbone.View.extend({
  Repositories: [],

  initialize: function (args) {
    if (!args.projectId) return;
    var me = this;
    this.$el.html('');
    this.collection = new Vision.RepositoryList(this.Repositories, {
     projectId : args.projectId 
    });
    this.collection.fetch({ success: function(){
        me.render();
        (args.editMode) ?  me.enableForm() : me.disableForm();
    }});
  },

  render: function () {
    _.each(this.collection.models, function (item) {
        this.add(item);
    }, this);
  },

  add: function (item) {
    var repositoryView = new Vision.RepositoryView({
        model: item
    });

    this.$el.append(repositoryView.render().el);
    return repositoryView;
  },

  enableForm: function(){
    this.$el.find('input:checkbox').remove('disabled');
  },

  disableForm: function(){
    this.$el.find('input:checkbox').attr('disabled', 'disabled');
  }
});

Vision.Project = Backbone.Model.extend({
  defaults: {
      id : ''
    , name: ''
  },

  idAttribute: '_id',
  urlRoot: '/project',

  validate: function(attrs) {
    var errors = [];
    if (attrs.name === '') errors.push('Please enter a name');
    if (errors.length > 0) return errors;
  }
});

Vision.ProjectList = Backbone.Collection.extend({
  model: Vision.Project,

  url: function () {
    return '/project/';
  },

  initialize: function() {
    this.fetch();
  }
});

Vision.ProjectView = Backbone.View.extend({
  tagName: 'li',
  formTemplate: visiontemplates['templates/project-form.hbs'],
  viewTemplate: visiontemplates['templates/projects.hbs'],

  events: {
    'click a' : 'repository', 
    'click button.delete': 'delete',
    'click button.edit': 'edit',
    'click button.save': 'save',
    'click button.cancel': 'cancel'
  },

  render: function () {
    var project = this.viewTemplate(this.model.toJSON());
    this.$el.html(project);
    return this;
  },

  repository: function(args) {
    var data = { projectId: this.model.toJSON()._id, editMode: args.editMode || false }
    this.event_aggregator.trigger('repository:join', data);
  },

  delete: function () {
    this.model.destroy();
    this.remove();
    this.repository({editMode:false});
  },

  edit: function () {
    var model = this.model.toJSON();
    this.$el.html(this.formTemplate(model));
    this.repository({editMode:true});
  },

  add: function () {
    this.$el.html(this.formTemplate(this.model.toJSON()));
    this.repository({editMode:false});
  },

  cancel: function () {
    var projectId = this.model.toJSON()._id;

    if (this.model.isNew()) {
      this.remove();
    } else {
      this.render();
      this.repository({editMode:false});
    }

    Backbone.history.navigate('index', true); 
  },

  save: function (e) {
    e.preventDefault();

    var me = this
    , formData = {}

    $(e.target).closest('form').find(':input').not('button').each(function () {
      formData[$(this).attr('class')] = $(this).val();
    });

    if (!this.model.isValid()) {
      me.formError(me.model, me.model.validationError, e);
    } else {
      formData.repositories = $('#repository-list').find('input:checkbox:checked')
      .map(function(){
        return $(this).val();
      }).get();
    }

    this.model.save(formData, {
      error: function(model, response) {
        me.formError(model, response, e);
      },
      success: function(model, response) {
        me.render();
        me.repository({editMode:false});
        Backbone.history.navigate('index', true);
      }
    });
  },

  formError: function(model, errors, e) {
    $(e.target).closest('form').find('.errors').html('');

    _.each(errors, function (error) {
      $(e.target).closest('form').find('.errors')
      .append('<li>' + error + '</li>')
    });
  }
});

Vision.ProjectListView = Backbone.View.extend({
  Projects: [],
  el: $('ul#projects-list'),

  initialize: function () {
    this.event_aggregator.on('repository:join', this.repository, this);
    this.collection = new Vision.ProjectList(this.Projects);
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.add, this);
    this.collection.on('remove', this.remove, this);
    this.render();
  },

  repository: function(args){
    this.trigger('join', args);
  },

  render: function () {
    _.each(this.collection.models, function (project) {
        this.add(project);
    }, this);
  },

  add: function (project) {
    var projectView = new Vision.ProjectView({
        model: project
    });

    this.$el.append(projectView.render().el);
    return projectView;
  },

  remove: function (removedModel) {
    var removed = removedModel.attributes;

    _.each(this.Projects, function (project) {
      if (_.isEqual(project, removed)) {
          this.Projects.splice(_.indexOf(projects, project), 1);
      }
    });
  },

  showForm: function () {
      this.add(new Vision.Project()).add();
  }
});

Vision.Router = Backbone.Router.extend({
  projectListView : '',
  repositoryListView:'',
  issueListView:'',
  commitListView:'',
  socket: null,

  routes: {
    '' : 'index',
    'add' : 'add'
  },  

  initialize : function(socket){
    this.socket = socket;
    this.project();
    this.listenTo(this.projectListView , 'join', this.join);
    this.socket.on('issues', this.issues);
    this.socket.on('commits', this.commits);
  },

  join : function(args){
    this.repository(args);
    this.issues(args);
    this.commits(args);
    this.socket.emit('unsubscribe');
    this.socket.emit('subscribe', { channel : args.projectId } );
  },

  project : function(){
    this.projectListView = new Vision.ProjectListView();
  },

  repository : function(args){
    this.repositoryListView = new Vision.RepositoryListView({ el: 'ul#repository-list', projectId: args.projectId, editMode: args.editMode });
  },

  issues : function(args){
    this.issueListView = new Vision.IssueListView({ el: 'ul#issues-list', projectId: args.projectId, issues : args.issues});
  },

  commits : function(args){
    this.commitListView = new Vision.CommitListView({ el: 'ul#commits-list', projectId: args.projectId, commits : args.commits});
  },

  index : function(){
    this.projectListView.render();
  },

  add : function(){
    this.projectListView.showForm();
  }
});

Vision.Application = function(){        
  this.start = function(){
    var socketio = io.connect('/', {secure: true, port: '8443'});
    var router = new Vision.Router(socketio);
    Backbone.history.start();
    router.navigate('index', true);
  }
};

$(function(){
  var app = new Vision.Application();
  app.start();
});