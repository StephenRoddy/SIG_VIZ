let sound,samhain, sW, sH, lake, fft, glitch, glitch2;

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
  imageMode(CENTER);
  let cnv = createCanvas(1000,1000);
  cnv.mouseClicked(togglePlay);

  fft = new p5.FFT();
  let waveform = fft.waveform();



//  sound.amp(0.3);
}


function draw(){

  if (sound.isPlaying()) {
//    gl_1b();
//    gl_2();

for (let i = 0; i < waveform.length; i++){
  glitch.resetBytes();
  glitch.randomBytes(5+(55*waveform[i])); // randomise bytes on basis of volume, minimum of 5 max of 60
  glitch.buildImage();
  image(glitch.image, width/2, height/2);
}


  }
  else {
    image(lake,500,500);
    image(samhain,500,500);
}

//  text('tap to play', 20, 20);

//  spectrum();
//  waveform();

}



function spectrum(){
  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}

 function waveform(){
   let waveform = fft.waveform();
   noFill();
   beginShape();
   stroke(250);
   for (let i = 0; i < waveform.length; i++){
     let x = map(i, 0, waveform.length, 0, width);
     let y = map( waveform[i], -1, 1, 0, height);
     vertex(x,y);
   }
   endShape();
 }

 function gl_1(){
   glitch.resetBytes();
   //glitch.replaceBytes(100, 104); // swap all decimal byte 100 for 104
   //glitch.resetBytes();
   glitch.randomBytes(15); // randomize 10 bytes
   //glitch.pixelate(0.75);
   glitch.buildImage();
   image(glitch.image, width/2, height/2);
 }



 function gl_1b(){
   let waveform = fft.waveform();
   for (let i = 0; i < waveform.length; i++){
     glitch.resetBytes();
     glitch.randomBytes(5+(55*waveform[i])); // randomise bytes on basis of volume, minimum of 5 max of 60
     glitch.buildImage();
     image(glitch.image, width/2, height/2);
   }
 }


function gl_2(){
 glitch2.resetBytes();
 glitch2.replaceBytes(100, 104); // swap all decimal byte 100 for 104

 glitch2.randomBytes(50); // randomize 10 bytes
 glitch2.buildImage();
 image(glitch2.image, width/2, height/2);
}

 function togglePlay() {
   if (sound.isPlaying()) {
     sound.pause();
   } else {
     sound.loop();
   }
 }
