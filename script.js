// --------------------- Function Expressions -----------
/**
 * Converts a linear amplitude to dB scale.
 * @param {number} linAmp - The linear amplitude value.
 * @returns {number} The corresponding amplitude in dB.
 */
const dBtoA = function (linAmp) {
    return Math.pow(10, linAmp / 20);
  };
  
  /**
   * Enables audio playback by resuming the AudioContext and starting the oscillator.
   */
  const enableAudio = function () {
    audioCtx.resume();
  };
  
  /**
   * Updates the master gain based on the master fader input.
   */
  const updateMasterGain = function () {
    let amp = dBtoA(fader.value);
    masterGain.gain.exponentialRampToValueAtTime(amp, audioCtx.currentTime + 0.01);
    faderLabel.innerText = `${fader.value} dBFS`;
  };

  
  // ------------------------- WebAudio Setup --------------------------
  
  /** @type {AudioContext} */
  const audioCtx = new AudioContext();
  
  // ------------------------- Master Gain --------------------------
  
  /** @type {GainNode} */
  
  // Create a GainNode — this will control the overall volume
let masterGain = audioCtx.createGain();
masterGain.gain.value = 1.0; // Set the master volume to full (1.0)

// Connect the master gain node to the audio output (speakers or headphones)
masterGain.connect(audioCtx.destination);

//declare var to hold audio source node (needed to stop playback)
let source;
//
// https://github.com/mdn/webaudio-examples/blob/main/audiocontext-states/index.html   
let susResBtn = function () {
    if (soundCtx.state === "running") {
      soundCtx.suspend().then(() => {
        susResBtn.textContent = "Resume";
      });
    } else if (soundCtx.state === "suspended") {
      soundCtx.resume().then(() => {
        susResBtn.textContent = "Pause";
      });
    }
  }
// Helper function
//function displayTime() {
//  if (audioCtx && audioCtx.state !== "closed") {
//    timeDisplay.textContent = `Current context time: ${audioCtx.currentTime.toFixed(
//      3
//    )}`;
//  } else {
//    timeDisplay.textContent = "Current context time: No context exists.";
//  }
//  requestAnimationFrame(displayTime);
//}

//displayTime();
//

//define async function to lead and play audio
let loadPlayAudio = async function() {
    //fetch audio file - returns proms (response) so we await completion
    const file = await fetch("link")
    //convert fetched file into array buffer (raw binary data); await bc operation took time
    const arrayBuffer = await file.arrayBuffer();
    //decode array buffer into audio buffer that web audio can use
    const audioBuffer = await soundCtx.decodeAudioData(arrayBuffer);
    //create audio buffer source node - this will play sound
    source = soundCtx.createBufferSource();
    //attach decoded audio data to source node
    source.buffer = audioBuffer;
    //connect audio source to master gain (volume control)
    source.connect(masterGain);
    //start playing audio immediately
    source.start();
}
// Add a click event listener to the "start" button
// When clicked, it runs loadPlayAudio() to fetch, decode, and play the sound
document.getElementById("start").addEventListener("click", loadPlayAudio);

// Add a click event listener to the "stop" button
// When clicked, it runs stopAudio() to stop the sound
document.getElementById("stop").addEventListener("click", susResBtn);

// Add a input event listener to the "volume" slider
// When input changed, it runs updateMasterGain() to adjust the gain
document.getElementById("gain").addEventListener("input", updateMasterGain);