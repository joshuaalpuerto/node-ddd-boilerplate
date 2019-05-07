# CLI

## Scripts

- `yarn start` - Start the Application in Production
- `yarn start:dev` - Start Application in `watchmode`
- `yarn start:cc` - Start `codecrumbs` good for overall overview
- `yarn start:docs` - Run documentation
- `yarn test` - Run [Blackbox](be-testing-blackbox-testing.html) and [Unit](be-testing-unit-testing.html) tests.
- `yarn db:refresh` - run all migrations.
- `yarn db:refresh-test` - run all migrations for testing.
- `yarn seed` - seed development database.
- `yarn seed:test` - seed test database.
- `standard` - lint codebase using JavaScript Standard Style
- `standard --fix` - fix code according to JS Standard Style

> Check [package.json](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/master/package.json#L10-L37) for more available scripts.

## Docker CLI

- `yarn docker:db:reset` - reset and run all migrations and seeders.
- `yarn docker:db:refresh` - reset and run all migrations.
- `yarn docker:db:refresh-test` - reset and run all migrations for test
- `yarn docker:test` - refreshes test database and run unit and black-box testing.
