let sound,samhain, sW, sH, lake, fft, glitch, glitch2,analyzer,glScl,glSclMod;

function preload(){
  sound = loadSound('audio/SIGIL.mp3');
  samhain = loadImage('img/samhain.png');
  lake = loadImage('img/bckScl.png');

  glitch = new Glitch();
  loadImage('img/samhain.png', function(im){
    glitch.loadQuality(.25); // reduce quality
    glitch.loadImage(im);
  });

  glitch2 = new Glitch();
  loadImage('img/bckScl.png', function(im){
        //glitch.loadType('jpg'); // complete type as processed
  glitch2.loadQuality(.25);
  glitch2.loadImage(im);
  });
}


function setup(){

  frameRate(10); // Keep frameRate (and fft ins) low to save on overhead
  let cnv = createCanvas(1000,1000);
  imageMode(CENTER);
  image(lake,500,500);
  image(samhain,500,500);
  initSound();
  cnv.mouseClicked(togglePlay);

}


function draw(){
  if (sound.isPlaying()) {
    analyseSound();
    gl();
    gl_2();
    sigil();
  }

}

function gl_1c(){

  glitch.resetBytes();
  glitchScl = ((fft.getEnergy("mid"))/256)*1;
  glitch.randomBytes(glitchScl); // randomise bytes on basis of amplitude range output from 1 to 200
  glitch.buildImage();
  tint(255, 127); // Display at half opacity
  image(glitch.image, width/2, height/2);

}


function gl(){
  glitch2.resetBytes(); // reset glitch to original bytes if loaded in setup
  glSclMod = ((fft.getEnergy("mid"))/256)*15;
  glScl = ((fft.getEnergy("treble"))/256)*glSclMod;
  glitch2.randomBytes(glScl); // randomize 10 bytes();
//  tint(255, 33); // Display at low opacity
  glitch2.buildImage();
  image(glitch2.image, width/2, height/2);
}

function gl_2(){
  glitch2.resetBytes(); // reset glitch to original bytes if loaded in setup
  glScl = ((fft.getEnergy("highMid"))/256)*5;
  glitch2.randomBytes(glScl); // randomize 10 bytes();
  tint(fft.getEnergy("bass"),fft.getEnergy("mid"),fft.getEnergy("treble"), 33 ); // Display at low opacity
  glitch2.buildImage();
  image(glitch2.image, width/2, height/2);
}


function gl_2b(){

  let spectrum, bass, lowMid, mid, highMid, treble;
  bass = fft.getEnergy("bass");
  mid = fft.getEnergy("mid");

  glitch2.resetBytes();
  glitch2.replaceBytes(255-bass, mid); // swap all decimal byte 100 for 104
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

 function initSound() {
   fft = new p5.FFT(0.6,1024);
   sound.amp(0.7);
 }
 function analyseSound() {
   soundSpectrum = fft.analyze(); // spectrum is array of amplitudes of each frequency
 }

function sigil(){
  //rotate(PI / 3.0);
  tint(255,255);
  image(samhain, width/2, height/2,125+(1.5*(fft.getEnergy("bass"))),125+(1.5*(fft.getEnergy("bass"))));
  //samhain.resize(2*(fft.getEnergy("bass")),2*(fft.getEnergy("bass")));
}
