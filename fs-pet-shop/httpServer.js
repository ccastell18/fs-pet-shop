'use strict';

var fs = require('fs');
var path = require('path');
let petPath = (__dirname, 'pets.json')

let http = require('http');
let port = process.env.PORT || 8000;


let server = http.createServer(function(req, res) {
  console.log(req.method, req.url)

  let urlParams = req.url.split('/');
  let resource = urlParams[1];
  let petIndex = urlParams[2];
    //console.log(urlParams);

  if (req.method === 'GET' && resource === 'pets') {

    fs.readFile(petPath, 'utf8', function(err, petsJSON) {
      if (err) {
        console.error(err);
      }

      let pets = JSON.parse(petsJSON);

      if (!Number.isNaN(parseInt(petIndex))) {
        let numberIndex = petIndex;
        if (numberIndex < 0 || petIndex >= pets.length) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Not Found');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(pets[petIndex]));
        }
      } else {
        res.setHeader('Content-Type', 'application/json');
        console.log(pets);
        res.end(JSON.stringify(pets));

      }

    })
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});
server.listen(port, function() {
  console.log('listening on port', port)
})
module.exports = server;
