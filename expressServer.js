var fs = require('fs');
var path = require('path');
let petPath = path.join(__dirname, 'pets.json')

let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

app.disable('x-powered-by');


app.get('/pets', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});
app.get('/pets/:id', function(req, res) {
    fs.readFile(petPath, 'utf8', function(err, petsJSON) {
      if (err) {
          console.error(err);
          return res.sendStatus(500);
      }
      let id = Number.parseInt(req.params.id);
      let pets = JSON.parse(petsJSON)

      if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
      }

      
      res.sendStatus= 200;
      res.send(pets[id]);
    });
});

app.use(function(req, res) {
  res.sendStatus = 404;
  res.set('Content-Type', 'text/plain');
});
app.listen(port, function() {
  console.log('listening on port', port)
})
module.exports = app;
