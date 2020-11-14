'use strict';

const path = require('path');

module.exports = {
  description: 'Add reducer',
  prompts: [
  {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    validate: (value) => {
      if ((/.+/).test(value)) { return true; }
      return 'name is required';
    }
  },
  {
    type: 'confirm',
    name: 'wantAction',
    default: true,
    message: 'Do you want to add an action?'
  }],
  actions: (data) => {
    let actions = [];
    const reducerTemplate = path.resolve(__dirname, 'reducer.js.hbs');

    actions.push({
      type: 'add',
      path: path.resolve(process.cwd(), 'src/reducers/{{camelCase name}}Reducer.js'),
      templateFile: reducerTemplate,
      abortOnFail: true,
    });

    if (data.wantAction) {
      const actionTemplate = path.resolve(__dirname, '../action/action.js.hbs');

      actions.push({
        type: 'add',
        path: path.resolve(process.cwd(), 'src/actions/{{camelCase name}}Actions.js'),
        templateFile: actionTemplate,
        abortOnFail: true,
      });
    }

    return actions;
  },
};
