'use strict'
let path = require('path');
let petPath = path.join(__dirname, '../pets.json');

let express = require('express');
let router = express.Router();

router.get('/pets', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);
    res.send(pets);
  })
});
router.get('/pets/:id', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(data);
    console.log(pets[id]);
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(pets[id]);
  });
});
router.post('/pets', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let pets = JSON.parse(petsJSON);
    let pet = req.body;


    if (!pet.name || !pet.kind || !pet.age) {
      res.set('Content-type', 'plain/text')
      res.sendStatus(400);
    } else {
      pets.push(pet);

      let newPetsJSON = JSON.stringify(pets);

      fs.writeFile(petPath, newPetsJSON, function(err) {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          }
          res.send(pet);

      });
    }
  });
});

router.patch('/pets/:id', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.set('Content-type', 'plain/text')
      res.sendStatus(404);
    }

    let pet = pets[id];

    let newPet = req.body;

    if (!newPet.name && !newPet.age && !newPet.kind) {
      res.set('Content-type', 'plain/text')
      res.sendStatus(400);
    }

    if (newPet.name) {
      pet.name = newPet.name;
    }
    if (newPet.kind) {
      pet.kind = newPet.kind;
    }
    if (newPet.age) {
      let petAge = parseInt(newPet.age);
      if (!isNaN(petAge)) {
        pet.age = petAge;
      } else {
        res.set('Content-type', 'plain/text')
        res.sendStatus(400);
      }
    }

    let newPetsJSON = JSON.stringify(pets);
    console.log("My updated pet", newPetsJSON);
    fs.writeFile(petPath, newPetsJSON, function(err) {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

      res.send(pet);
    });
  });
});
router.delete('/pets/:id', function(req, res) {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    let pet = pets.splice(id, 1)[0];
    let newPetsJSON = JSON.stringify(pets);
    console.log('pet also', pet);
    fs.writeFile(petPath, newPetsJSON, function(err) {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      console.log('pets are here', pet);
      res.set('Content-type', 'application/json');
      res.send(pets);

    });
  });
});

module.exports = router;
