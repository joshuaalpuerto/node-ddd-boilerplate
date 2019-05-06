# Paths and Require

You'll notice that in the files from the codebase most of the time we don't use `../` on the `require`s but instead we require files from the application as the root of the project was a Node package.

It's important to warn you that __it's not the default behavior of Node's require__, but we change that defining a environment variable called `NODE_PATH` with the path of the root of the project. Doing that we're defining that the root of the project may be used as any other package, making our life easier when it comes to requiring files, but __it will not prevent you from using relative paths normally when requiring files__!

This variable should be set on every entry point of execution of your project for it to work properly, that's why we use it in our npm test scripts on [`package.json`](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/22767a4cdda0f5232391709515a4af41d15796ee/package.json#L15-L16) file, we don't do that for the production mode (the `start` script) because it's done on the [`cluster.js` file](https://github.com/joshuaalpuerto/node-ddd-boilerplate/blob/22767a4cdda0f5232391709515a4af41d15796ee/cluster.js#L13) directly.

Setting this variable to make your life easier will never bite you, but be aware that you have to remember to set it in case you add new npm scripts that will interact with files that use non-relative paths on `require`.
