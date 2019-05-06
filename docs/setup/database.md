# Database Setup

By default we use [Sequelize](http://docs.sequelizejs.com/) setup with PostgreSQL, you can change it by [installing the adapter for your DBMS](http://docs.sequelizejs.com/en/latest/docs/getting-started/#installation) and then changing the setting for your environment on `config/database.js`.

You can use different dialects for each environment, it's a common pattern to use SQLite on test environment and PostgreSQL for development and production.
