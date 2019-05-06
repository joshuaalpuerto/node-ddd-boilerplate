# Dependency injection container

Dependency injection is a way to implement the [Inversion of control](https://www.martinfowler.com/articles/injection.html) pattern. The core idea of this pattern is that every dependency of a object that _can_ (and makes sense to) be decoupled from that should be injected to make it more flexible and reusable, making the call-site have control over the dependencies of the called method, thus _inversion of control_.

In this boilerplate we make extensive use of dependency injection in the `app`, `interfaces` and `infra` layers, for example:

- Injecting the ORM classes in the repositories at the `infra` layer;
- Injecting the repositories in the operations at the `app` layer;
- Injecting the operations in the controllers at the `interfaces` layer.

We implement dependency injection using the [Awilix](https://www.npmjs.com/package/awilix) library, that is very flexible and easy to use. The author of the library has three wonderful posts about dependency injection on Node and how to use Awilix, you can read them here: [part 1](https://medium.com/@Jeffijoe/dependency-injection-in-node-js-2016-edition-f2a88efdd427), [part 2](https://medium.com/@Jeffijoe/dependency-injection-in-node-js-2016-edition-part-2-aedc5fd6eed0) and [part 3](https://medium.com/@Jeffijoe/dependency-injection-in-node-js-2016-edition-part-3-c01471c09c6d). For the injections on the controllers we use the [Express Awilix adapter](https://www.npmjs.com/package/awilix-express).

The base of our dependency injection is a design pattern called _composition root_, and in the boilerplate it sits on the root of our `src` folder, in the [`src/container.js`](https://github.com/joshuaalpuerto/node-ddd-boilerplate/tree/master/src/container.js) file. That's where we'll define what each of our injected dependencies will return, you should edit this file according to the growth of your application, like adding new operations and repositories to be injected.
