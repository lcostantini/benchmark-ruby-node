const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = 8090;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const express = require('express');
  const fs = require('fs')

  var app = express();

  app.get('/', handleRequest);

  app.listen(PORT);

  console.log("Server listening on: http://localhost:%s", PORT);
}

function handleRequest(request, response) {
  console.log("New request ", new Date());

  fs.readFile('../test.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    response.end(new Array(1000).join(data));
  });
}
