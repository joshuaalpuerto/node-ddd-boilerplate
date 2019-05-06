# Blackbox

One of the best ways to test your REST APIs is to treat them as black boxes.

**Black-box testing is a method of testing where the functionality of an application is examined without the knowledge of its internal structures or workings.** So none of the dependencies are mocked or stubbed, but the system is tested as a whole.

One of the modules that can help you with black-box testing Node.js REST APIs is [supertest](https://www.npmjs.com/package/supertest).

A simple test case which checks if a user is returned using the test runner mocha can be implemented like this:

```js
const request = require('supertest')

describe('GET /user/:id', function() {
  it('returns a user', function() {
    // newer mocha versions accepts promises as well
    return request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(200, {
        id: '1',
        name: 'John Math'
      }, done)
  })
})
```

**You may ask: how does the data gets populated into the database which serves the REST API?**

In general, it is a good approach to write your tests in a way that they make as few assumptions about the state of the system as possible. Still, in some scenarios you can find yourself in a spot when you need to know what is the state of the system exactly, so you can make assertions and achieve higher test coverage.

So based on your needs, you can populate the database with test data in one of the following ways:

- run your black-box test scenarios on a known subset of production data,
- populate the database with crafted data before the test cases are run. (see [commands](be-general-commands.html))

Of course, black-box testing does not mean that you don't have to do unit testing, you still have to write unit tests for your APIs.

