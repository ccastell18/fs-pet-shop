'use strict'
var fs = require('fs');
var path = require('path');
var stream = require('./pets.json');


var node = path.basename(process.argv[0]); // grabbing node string from node path
var file = path.basename(process.argv[1]); // grabbing file name `pets.js`
var command = process.argv[2];



if (command === "read") {
  var petIndex = process.argv[3];

  // We have a pet index passed in, we need to ensure it's a valid index. Show error if not.
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var newData = JSON.parse(data);


    if (petIndex) {
      if (!numberCheck(petIndex)) {
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      } else {
        console.log(newData[petIndex]);
        process.exit(0);
      }

    } else {
      // We weren't provided with an index, just show all of the animals.
      console.log(newData);
    }


  });

} else if (command === 'create') {
  let age = process.argv[3];
  let kind = process.argv[4];
  let name = process.argv[5];
  if(!age || !kind || !name){
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
    }

    var pet = {};
    var petAge = Number(process.argv[3]);

    // parse Json to array of objects
    var newData = JSON.parse(data);

    //pet info and join
    pet.age = petAge;
    pet.kind = process.argv[4];
    pet.name = process.argv[5];
    console.log(pet);
    newData.push(pet);

    var newJSON = JSON.stringify(newData)
    //write the file back to json
    fs.writeFile('./pets.json', newJSON, function(err) {
      if (err) {
        console.error(err);
      }
    })


  })
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}

function numberCheck(n) {
  return !isNaN(n) || n > process.argv.length
}
