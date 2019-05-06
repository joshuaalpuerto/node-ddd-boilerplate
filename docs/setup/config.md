# Configurations

The configuration for each environment is on the `config/environments/<env>.js` file, here's an example of environment file:

```javascript
module.exports = {
  web: {
    port: 3000
  },
  logging: {
    appenders: [
      { type: 'console' }
    ]
  }
};
```

This file setups the port 3000 for the web server and uses a console appender for the logger. Feel free to add more keys and values to be used across the app, but try to always inject the configuration instead of requiring the `config/index.js` file directly.
