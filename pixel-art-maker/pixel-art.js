let currentColor = 'white';
let pixelContainer = document.getElementById('pixelContainer');

for (let i = 0; i < 2652; i++) {
  let pixel = document.createElement('div');
  pixel.className = 'pixel';
  pixelContainer.appendChild(pixel);
}




pixelContainer.addEventListener('click', function(event) {
  if (event.target !== this) {
    if(event.target.style.backgroundColor == currentColor){
      event.target.style.backgroundColor = 'white';
    }
    else{
      event.target.style.backgroundColor = currentColor
    }
  }

  //console.log('Pixel Container has been pressed.');
});

///// Paintbrush /////
let colorPick = document.getElementById('colorPick');

colorPick.addEventListener('click', function(event) {
  if (event.target !== this) {
    currentColor = window.getComputedStyle(event.target,null).getPropertyValue('background-color'
  );
  colorAlert.style.backgroundColor=currentColor
  }
  console.log('Color Picker has been pressed.');
});
  //current color//
  let colorAlert = document.getElementById('current');
  
