# Patterns recommendations and operations

As stated in [Folder structure](be-architecture-folder-structure.html), the boilerplate follows an architecture inspired by DDD and Clean Architecture. It implies in some patterns and methodologies having to be followed to ensure separation of concerns and make the codebase more maintainable, I'll list of them here and suggest some links in the end with further info of patterns and practices that work well with this architecture.

## Separation of concerns

Separation of concerns is ensured in this codebase in two ways:

1) Separating the source code in [layer](be-architecture-folder-structure.html), each layer with a different responsibility that should be followed;
2) Each layer is also separated by actual _concerns_. When we talk about concerns in software development it's not about functionality, like `controllers` or `models`, but about _concepts_ or _contexts_, like `users`, `logging`, `persistence` and so on.

All the patterns below have direct relation with separation of concerns.

## Repository pattern

Inside the use cases you should also not touch the database directly, it's not the responsibility of the application layer to know how to work with data persistence. So we implement [repositories](https://martinfowler.com/eaaCatalog/repository.html) that handle the persistence internally and inject them on the operations instances.

__Attention for this point__: the repositories __interfaces__ (as in OOP interfaces, __not__ the `interfaces` layer) belongs to the `domain` layer, and their __implementations__ (that effectively talk to the database) belongs to the `infra` layer, but since we don't have interfaces in JavaScript we just implement them on the `infra` layer and inject it with the name of the imaginary interface. An example of that is the `UsersRepository`, we use it in the operations like [`usersRepository`](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/22767a4cdda0f5232391709515a4af41d15796ee/src/app/user/post.js#L8), but what we are really [__injecting__](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/22767a4cdda0f5232391709515a4af41d15796ee/src/container.js#L17) is the [`SequelizeUsersRepository`](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/master/src/infra/repositories/user.js) that communicates internally with the SQL database. The important point here is that: __The operation doesn't know how the repository works internally, it just knows the `UsersRepository` methods and the parameters it expects__.

The repository implementations should also return something that the `domain` and the `app` layers can have access, so that's why we use mappers for that, that receives stuff from the database and convert it to objects from the `domain` layer. An example of that is the [`Transformer`](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/master/src/infra/repositories/transforms/user.js), that knows how to convert an record from the `users` table of the database to an instance of the [`User`](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/master/src/domain/user/user.js) domain class and _vice versa_.

Separating the persistence from the `app` layer like this make it easier to test the `app` layer with different simulated responses from the database, including errors.

## Further info

You can know more about the subjects that we talked about here in the following links:

- [Architecture the Lost Years](https://www.youtube.com/watch?v=WpkDN78P884)
- [Domain-driven design](https://domainlanguage.com/ddd/)
- [FourLayerArchitecture](http://wiki.c2.com/?FourLayerArchitecture)
- [Clean architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
