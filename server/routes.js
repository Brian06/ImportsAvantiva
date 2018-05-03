var request = require("request");
var utils = require('./utils');
var firebaseActions = require('./firebase.actions');

module.exports = function (app) {
  let apiUrlBase = "/api/v1";

  //check if the credentials (from body) are from one of the users listed on data.js file
  app.post(`${apiUrlBase}/login`, function (req, res) {
    let user = utils.findUser(req.body);
    if (user) {
      let loginSuccessful = {
        user: {
          name: user.name,
          email: user.email,
          userName: user.userName
        },
        successful: true
      };
      res.json(loginSuccessful);
    } else {
      res.json({ successful: false });
    }
  });

  //call jira API to get ticket data
  app.get(`${apiUrlBase}/import/:id`, function (req, res) {
    let ticketNumber = req.params.id;
    let url = utils.getJiraApiUrl(ticketNumber);
    let auth = utils.getJiraAuthHeader();

    request({
      headers: {
        'Authorization': auth
      },
      uri: url,
      method: "GET"
    }, function (error, response, body) {
      if (error) {
        res.json(null);
      }
      let data = JSON.parse(body);
      if (data && data.fields) {
        data.id = ticketNumber;
        res.json(utils.getTicketData(data));
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  // get all projects
  app.get(`${apiUrlBase}/projects`, function (req, res) {
    firebaseActions.getProjects(true, function(savedProjects) {
        res.json(savedProjects);
    });
  });

  // get project by id TODO: use fsId to get that specific project from firebase
  app.get(`${apiUrlBase}/projects/:id`, function (req, res) {
    let id = req.params.id;
    firebaseActions.getProjects(true, function(savedProjects) {
      let project = savedProjects.find(x => x.id === id);
      res.json(project);
    });
  });

  // save project on firebase
  app.post(`${apiUrlBase}/import`, function (req, res) {
    let project = req.body;
    firebaseActions.getProjects(true, function(savedProjects) {
      let projectExist = savedProjects.find(x => x.id === project.id);
      let result = {
        haveErrors: true,
        message: ''
      };
      if (project && !projectExist) {
        firebaseActions.saveProject(project, error => {
          result.haveErrors = !!error;
          result.message = 'Project Saved Successfully';
          res.json(result);
        });
      } else {
        result.message = 'Project already exists';
        res.json(result);
      }
    });
  });

  // delete project from firebase
  app.delete(`${apiUrlBase}/projects/:id`, function (req, res) {
    let id = req.params.id;
    firebaseActions.removeProjects(id, function(result) {
      res.json(result);
    });
  });
};