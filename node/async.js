const fs = require('fs')
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = 9292;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  var server = http.createServer(handleRequest);

  server.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
  });
}

function handleRequest(request, response) {
  fs.readFile('../test.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    var i = 1000;
    while (i--) {
      response.write(data);
    }

    response.end();
  });
}
