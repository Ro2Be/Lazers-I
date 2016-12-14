go = 0; // 0 game, 1 gameover
t = 0; // time
gs = 100; //gs
gss = 100; //gssurlplus
slc = 5; //startlazercount
lp = []; //lazerpoints
sc = 0; //score
ts = 0; //topscore

cw = 300; //canvas width
ch = 300; //canvas height

rectPosX = cw / 2;
rectPosY = ch - 20;
rectw = 20;
recth = 20;  

etf0 = 0; //eventtimefactor
etf1 = 1 / 5; //eventtimefactor
etf2 = 2 / 5; //eventtimefactor
etf3 = 3 / 5; //eventtimefactor
etf4 = 4 / 5; //eventtimefactor
etf5 = 5 / 5; //eventtimefactor

lc = slc; //lazercount
lt = 15000 / gs; //lazertime  
te0 = lt * etf0; //timeevent
te1 = lt * etf1; //timeevent
te2 = lt * etf2; //timeevent
te3 = lt * etf3; //timeevent
te4 = lt * etf4; //timeevent
te5 = lt * etf5; //timeevent

function preload() {
  songBySANDU = loadSound("sound/SANDU - LazersExclusive.mp3");
  soundLaserCanon = loadSound("sound/MikeKoenig - LaserCanon.mp3")
  soundAlarmClock = loadSound("sound/SoundBible - AlarmClock.mp3")
}

function setup() {
  createCanvas (cw, ch);
  this.createLazerPoints();
  songBySANDU.loop([0],[1.12],[0.3],[0],[77]);
}

function draw() {
  if (go === 0) {
  timeEvents();
  nextLevel ();
  showLazers();
  showPlayer();
  showInformation ();
  if (rectPosY != ch - 20) {rectPosY += 1;}
  t += 1;
  } //Game
  if (go === 1) {
    t = 0;
    background(0);
    fill (255, 0, 155)
    textSize(40);
    text("GAME OVER", cw/2 -120, ch/2);
    rect (cw/2 -55, ch/2 + 30, 110, 40);
    textSize(24);
    fill (255);
    text("AGAIN", cw/2 - 35, ch/2 + 60);
    showInformation();
  } //GameOver,
}

function mousePressed() {
  rectPosY -= 20;
  if (go === 1 & mouseX > cw/2 - 55 & mouseX < cw/2 + 55 & mouseY > ch/2 + 30 & mouseY < cw/2 + 70) {restart();}
}

function timeEvents() {
  strokeWeight (t/4);
  if (te0 < t) {background (0); stroke (map(t, 0, te2, 0, 255), 255, map(t, 0, te2, 0, 255), map(t, 0, 50, 0, 255));}
  if (te1 === t) {soundLaserCanon.play([0],[0.7],[0.5],[0],[1]);}
  if (te1 < t) {stroke (255, map(t, te1, te3, 255, 0), map(t, te1, te3, 255, 0), 200);}
  if (te2 === t) {soundAlarmClock.play([0],[1],[1],[0],[1.2]);}
  if (te2 < t) {gameOver();}
  if (te3 < t) {background (map(t, te3, te4, 255, 0));strokeWeight(map(t, te3, te4, 20,0))}
  if (te4 < t) {background(0); strokeWeight(0);}
}

function createLazerPoints () {
  lp = [];
  for (var i = 0; i < 2*lc; i++) {lp.push(random(-ch/2, 3*ch/2));
  }
}

function nextLevel () { 
  if (t === lt) {
    this.createLazerPoints ();
    t = 0;
    if (lc != slc + 8) {lc += 1;}
    gss += 100
    gs += gss;
    sc += 1;
  } 
}

function showLazers () {
  for (var i = 0; i < lc; i++) { line (-rectw, lp[i], cw + rectw, lp[i + lc]); }
}

function showPlayer () {
  noStroke ();
  fill (255, 0, 155);
  rectPosX = mouseX;
  rect (rectPosX, rectPosY, rectw, recth);
}

function gameOver () {
 if (te4 < t) {return;}
 for (var i = 0; i < lc; i++) 
 {
   var y1 = lp[i];
   var y2 = lp[i + lc]
 if (y1 > y2)
  { 
    if (y2 + (cw + rectw - rectPosX)*(y1 - y2)/(2*rectw + cw) > rectPosY) 
    {
       if (y2 + (cw - rectPosX)*(y1 - y2)/(2*rectw + cw) < rectPosY + recth) 
      {
       go = 1;
      }
    }
  }
  
 if (y1 === y2) 
  { 
    if (y1 > y2) 
    {
       if (y1 < y2 + recth) 
      {
       go = 1;
      }
    }
  }
  
  if (y1 < y2) 
  { 
    if (y2 + (cw - rectPosX)*(y1 - y2)/(2*rectw + cw) > rectPosY) 
    {
       if (y2 + (cw +rectw - rectPosX)*(y1 - y2)/(2*rectw + cw) < rectPosY + recth) 
      {
       go = 1;
      }
    } 
  }
 }
}

function restart () {
go = 0;  
lc = slc;
sc = 0;
this.createLazerPoints();
}

function showInformation () {
  if (ts < sc) {ts = sc;}
  textSize(15); 
  text("Topscore: " + str(ts), 10, 20);
  text("Score: " + str(sc), 10, 40);
}