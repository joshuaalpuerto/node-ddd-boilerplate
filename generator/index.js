const appGenerator = require("./app/index.js");
const routeGenerator = require("./route/index.js");
const repositoryGenerator = require("./repository/index.js");

module.exports = (plop) => {
  plop.setGenerator("app", appGenerator);
  plop.setGenerator("repository", repositoryGenerator);
  plop.setGenerator("route", routeGenerator);
};
