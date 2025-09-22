1. package.json in Node.js is a JSON file storing metadata, dependencies, and scripts. Example:
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```
  2. The `require` function is used to import modules in Node.js:
```js
const fs = require('fs');
fs.readFileSync('file.txt', 'utf8');
```
  3. The `require` function can import built-in modules, custom modules, or npm packages.
  4. A callback function in Node.js is a function passed as an argument to another function, executed after an operation is completed. Commonly used in asynchronous operations:
```js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```
  5. Modules in Node.js are reusable blocks of code:
  - Built-in modules: fs, http, path
  - Local modules: custom files you create
  - Third-party modules: installed via npm
  6. Global objects in Node.js include:
  - __dirname: current directory
  - __filename: current file
  - global: global namespace object
  - process: information about the running process

Node.js handles asynchronous operations through an event loop, allowing it to handle I/O without blocking the main thread. It uses the event loop to continuously check the callback queue and execute functions when the main thread is free.

1. The Event Loop in Node.js handles asynchronous operations by continuously checking the callback queue and executing functions when the main thread is free.
2. Middleware in Node.js are functions that execute during the request-response cycle in frameworks like Express, used to modify req, res or perform tasks like logging, authentication.
3. Synchronous functions execute one after another and block the main thread, while asynchronous functions do not block the main thread and can execute non-blocking I/O operations.
4. Streams in Node.js handle reading/writing large data efficiently without loading everything into memory:
  - Readable: read data (fs.createReadStream)
  - Writable: write data (fs.createWriteStream)
  - Duplex: read + write
  - Transform: modify data while streaming
5. The Buffer class in Node.js is used to handle binary data (files, network packets).
6. Exceptions in Node.js can be handled using try-catch for synchronous code and error-first callbacks or .catch() for asynchronous code.
7. `process.nextTick()` executes before the next event loop iteration (high priority), while `setImmediate()` executes on the next event loop iteration after I/O events.