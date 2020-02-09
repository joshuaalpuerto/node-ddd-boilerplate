# Upgrading

Once you update your **Node** version, you also need to re-install you dependencies(node_modules). This boilerplate is using `bcrypt` for encryptions, and it uses `node-gyp` which needs to be compiled. That said, you might encounter this error:

```sh
~/workspace$ node app.js
module.js:682
return process.dlopen(module, path._makeLong(filename));
^

Error: The module '/home/workspace/node_modules/bcrypt/lib/binding/bcrypt_lib.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 67. This version of Node.js requires
NODE_MODULE_VERSION 57. Please try re-compiling or re-installing
the module (for instance, using npm rebuild or npm install).
at Object.Module._extensions..node (module.js:682:18)
at Module.load (module.js:566:32)
at tryModuleLoad (module.js:506:12)
at Function.Module._load (module.js:498:3)
at Module.require (module.js:597:17)
at require (internal/module.js:11:18)
at Object.<anonymous> (/home/treehouse/workspace/node_modules/bcrypt/bcrypt.js:6:16)
at Module._compile (module.js:653:30)
at Object.Module._extensions..js (module.js:664:10)
at Module.load (module.js:566:32)
```

### How to fix
1. Ensure that you don't have any `pm2` process.
    - `pm2 list` - to show the process
    - `pm2 kill` - kill the process
2. Rebuild your **bcrypt**
```sh
npm rebuild bcrypt --update-binary
```
