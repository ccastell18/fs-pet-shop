//Theremin//
let context = new(window.AudioContext || window.webkitAudioContext)();
let osc=null;
let vol = context.createGain();
vol.connect(context.destination)

//theremin parameters//
let maxFreq = 2000;
let maxVol= 1;

//theremin instructions//
document.addEventListener('mousemove', function(event) {
	if(osc)
	{
		var percentWidth = event.clientX / window.innerWidth;
		var percentHeight = event.clientY / window.innerHeight;

		osc.frequency.value = percentWidth * maxFreq;
		vol.gain.value = percentHeight * maxVol;
	}
});
//create sound//
function playSound(){
  osc = context.createOscillator();
  osc.type;
  osc.frequency.value;
  osc.connect(vol);
  osc.start();
}
//Select Waveform//
document.getElementById('waveform').addEventListener('click',function(){
  osc.type=event.target.value;
})

//WAVEFORM-STOP//
function stopSound(){
  osc.stop();
  osc.disconnect()
}


//START-BUTTON//
document.getElementById("play").addEventListener('click',playSound);
//STOP-BUTTON//
document.getElementById("stop").addEventListener('click',stopSound);
