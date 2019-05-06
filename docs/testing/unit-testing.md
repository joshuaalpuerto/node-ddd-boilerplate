# Unit Testing

We write unit tests to see if a given module (unit) works. All the dependencies are stubbed, meaning we are providing fake dependencies for a module.

**You should write the test for the exposed methods, not for the internal workings of the given module.**

## The Anatomy of a Unit Test
Each unit test has the following structure:

1. Test setup
2. Calling the tested method
3. Asserting

**Each unit test should test one concern only.**
*(Of course this doesn't mean that you can add one assertion only).*

## Modules Used for Node.js Unit Testing

For unit testing, we are going to use the following modules:

- test runner: [mocha](https://www.npmjs.com/package/mocha)
- assertion library: [chai](http://www.chaijs.com/), alternatively the assert module (for asserting)
- test spies, stubs and mocks: [sinon](http://sinonjs.org/) (for test setup).
