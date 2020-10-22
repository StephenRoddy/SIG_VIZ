let sound,samhain, sW, sH, lake, fft, glitch, glitch2,analyzer;

function preload(){
  sound = loadSound('audio/SIGIL.mp3');
  samhain = loadImage('/img/samhain.png');
  lake = loadImage('/img/bckScl.png');

  glitch = new Glitch();
  loadImage('/img/samhain.png', function(im){
  //  glitch.loadType('png'); // complete type as processed
		glitch.loadImage(im);
	});

  glitch2 = new Glitch();
  loadImage('/img/bckScl.png', function(im2){
    //glitch.loadType('jpg'); // complete type as processed
		glitch2.loadImage(im2);
	});
}

function setup(){
  frameRate(10); // Keep frameRate (and fft ins) low to save on overhead
  imageMode(CENTER);
  let cnv = createCanvas(1000,1000);
  //image(lake,500,500);
  //image(samhain,500,500);
  sound.loop();
  //sound.pause();
    // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(sound);

// Create new fft
  fft = new p5.FFT(.8,16); //16 bins. Small fft. Smoothing factor of .8/default
  fft.setInput(sound);

  cnv.mouseClicked(togglePlay);
  sound.amp(0.3);


}


function draw(){

  if (sound.isPlaying()) {

    gl_2b();
    gl_1c();

  }
  else {
  //  image(lake,500,500);
//    image(samhain,500,500);
}

}

// Working glitch function based on amplitude.
function gl_1c(){
  let rmsScl = ceil(5000*(analyzer.getLevel()));
  glitch.resetBytes();
  glitch.randomBytes((rmsScl)); // randomise bytes on basis of amplitude range output from 1 to 200

  glitch.buildImage();
  tint(255, 127); // Display at half opacity
  image(glitch.image, width/2, height/2);
  console.log(rmsScl);
}


//working fft driven glitch function
function gl_2b(){

  let spectrum, bass, lowMid, mid, highMid, treble;

  spectrum = fft.analyze();

  // The enrgy levels scale in a range of 0 to 255
  bass = fft.getEnergy("bass");
  //lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
//  highMid = fft.getEnergy("highMid");
  //treble = fft.getEnergy("treble");

  glitch2.resetBytes();
  //glitch2.replaceBytes(50, bass); // swap all decimal byte 100 for 104
//  glitch2.replaceBytes(150, lowMid); // swap all decimal byte 100 for 104
  glitch2.replaceBytes(255-bass, mid); // swap all decimal byte 100 for 104
  //glitch2.replaceBytes(300, highMid); // swap all decimal byte 100 for 104
  glitch2.replaceBytes(5000+highMid, treble); // swap all decimal byte 100 for 104

  glitch2.buildImage();
  tint(255, 33); // Display at low opacity
  image(glitch2.image, width/2, height/2);
}

 function togglePlay() {
   if (sound.isPlaying()) {
     sound.pause();
     image(lake,500,500);
     image(samhain,500,500);
   } else {
     sound.loop();
   }
 }
