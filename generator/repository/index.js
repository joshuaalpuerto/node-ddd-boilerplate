"use strict";

module.exports = {
  description: "Add repository",
  prompts: [
    {
      type: "input",
      name: "model",
      message: "Model name for which to generate the repository?",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return "model is required";
      },
    },
  ],
  actions: (data) => {
    let repositoryRelativePath = "src/infra/repositories/{{camelCase name}}/";

    const actions = [
      {
        type: "add",
        path: `${repositoryRelativePath}index.js`,
        templateFile: "generator/repository/index.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${repositoryRelativePath}transform.js`,
        templateFile: "generator/repository/transform.js.hbs",
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
