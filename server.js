var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

//firebase config
var admin = require("firebase-admin");
var serviceAccount = require("./server/firebaseConfiguration.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://importsavantica.firebaseio.com"
});

app = express();
app.use(bodyParser());
app.use(serveStatic(__dirname));
//remove this when deploy,use just on development
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var port = process.env.PORT || 5000;
require('./server/routes')(app);
app.listen(port);
console.log('server started '+ port);