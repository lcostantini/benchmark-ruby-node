const fs = require('fs')
const http = require('http');
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
  var server = http.createServer(handleRequest);

  server.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
  });
}

function handleRequest(request, response) {
  var data = fs.readFileSync('../test.txt', 'utf8');
  var res = '';
  for (var i = 1000 - 1; i >= 0; i--) {
    res += data;
  }
  response.end(data);
}
