"use strict";

module.exports = {
  description: "Create app and route files",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Name of the app",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return "name is required";
      },
    },
    {
      type: "input",
      name: "routeName",
      message: "Name of the route",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return "route is required";
      },
      description: "This is used in router.js",
    },
    {
      type: "confirm",
      name: "InjectRepository",
      default: false,
      message: "Would you inject repository in the methods?",
    },
    {
      type: "input",
      name: "repositoryName",
      message: "Name of existing repository.",
      description: "Only needed if previous answer was in affirmitive?",
    },
    {
      type: "input",
      name: "domainName",
      message: "Name of primary domain object class.",
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js

    let appRelativePath = "src/app/{{camelCase name}}/";
    let routeRelativePath = "src/interfaces/http/modules/{{camelCase name}}/";

    const actions = [
      {
        type: "add",
        path: `${appRelativePath}index.js`,
        templateFile: "generator/app/index.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${appRelativePath}get.js`,
        templateFile: "generator/app/get.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${appRelativePath}post.js`,
        templateFile: "generator/app/post.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${appRelativePath}put.js`,
        templateFile: "generator/app/put.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${appRelativePath}delete.js`,
        templateFile: "generator/app/delete.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${routeRelativePath}index.js`,
        templateFile: "generator/route/index.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${routeRelativePath}instance.js`,
        templateFile: "generator/route/instance.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${routeRelativePath}router.js`,
        templateFile: "generator/route/router.js.hbs",
        abortOnFail: true,
      },
      {
        type: "append",
        path: "src/interfaces/http/router.js",
        pattern: `/* PLOP_INJECT_ROUTE */`,
        template: `\t\tapiRouter.use('/{{camelCase routeName}}', controller('{{camelCase name}}').router);`,
      },
    ];

    return actions;
  },
};
