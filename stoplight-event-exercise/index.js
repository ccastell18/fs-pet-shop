let controls =  document.getElementById('controls');
controls.addEventListener('click', function(event){
  let signal = event.target.id.replace('Button', '');

 document.getElementById(signal + 'Light').classList.toggle(signal);
});




  // YOUR CODE HERE
