//points/economy for player
var pt = 0;
//year
var year = 2250;
//points per capital
var ptpc = 1;
//point per capital upgrade cost
var ptpcuc = 10;

//point cooldown
var ptpccd = 100;

//cooldown max
var ptpccdm = 100;

//planets owned by player
var waterPlanets = 0;
var desertPlanets = 0;
var icePlanets = 0;
var gaiaPlanets = 0;
//planets in image
var wPlanets;
var dPlanets;
var iPlanets;
var gPlanets;
// will be populated in preload() after images load
var planets = [];
// placedPlanets will hold static planet instances drawn each frame
var placedPlanets = [];

//implimented  factions
var notPlaying;

var aztecGators;

var romanWolfs;

var cartageCrocs;
//unimplimented factions

var faction4;
var faction5;
var faction6;
var faction7;
var faction8;

//list of factions
var factionsList = [
  notPlaying,
  aztecGators,
  romanWolfs,
  cartageCrocs,
  faction4,
  faction5,
  faction6,
  faction7,
  faction8,
];
//age sysrtem list
var earlySpaceAge;
var starExplorationAge;
var ionicPropultionAge;
var darkMatterDiscoveryAge;
var darkMatterResearchAge;
var darkMatterUtilizationAge;
var intergalacticTravelAge;
var intergalacticEmpireAge;
var ages = [
  earlySpaceAge,
  starExplorationAge,
  ionicPropultionAge,
  darkMatterDiscoveryAge,
  darkMatterResearchAge,
  darkMatterUtilizationAge,
  intergalacticTravelAge,
  intergalacticEmpireAge,
];
//current selected faction
factions = 0;
//font
let pressStart;

//images
function preload() {
  try {
    pressStart = loadFont("PressStart2P-Regular.ttf");
  } catch (e) {
    console.log("Font not loaded, using default");
  }

  try {
    //factions
    aztecGators = loadImage("aztecGators.png");
  } catch (e) {
    console.log("aztecGators image not loaded");
  }
  //romanWolfs =loadImage("romanWolfs.png");

  //planets
  wPlanets = loadImage("waterPlanet.png");
  dPlanets = loadImage("desertPlanet.png");
  iPlanets = loadImage("frozenPlanet.png");
  //gPlanets = loadImage("giaPlanets.png");

  // populate planets array only after images are loaded
  planets = [wPlanets, dPlanets, iPlanets, /*gPlanets*/];

  space = loadImage("space.png");
}

//canvas and other stuff
function setup() {
  createCanvas(1500, 1715);
  textFont(pressStart);
  textSize(16);
  console.log("Setup complete - p5.js is working!");
  // generate static planet placements once
  planetRandomizer(30);
}

//draw the ui and gameplay
function draw() {
  background(0);
  //image
  // map
 
  // draw static planets placed at startup
  for (let p of placedPlanets) {
    if (p.img) image(p.img, p.x, p.y);
  }
  //faction selection
  if (aztecGators) {
    image(aztecGators, 10, 80, 100, 100);
  } else {
    fill(0);
    rect(10, 80, 100, 100);
  }
  //ui
  if (pressStart) {
    textFont(pressStart);
  }
  textSize(16);
  fill(255);
  //credits
  text("game and art by fuzzy_foxf", 10, 750);

  //game info
  text("Points:" + pt, 10, 20);
  text("Points per capital:" + ptpc, 10, 40);
  text("production timer:" + ptpccd, 10, 60);
  text("year:"+year,10,730)

  if (factions == 0) {
    // code to set the selected faction as the current faction
    // maybe use list variable to store the selected faction and use it in the game logic
    text("unselected", 500, 20);
  } else if (factions == 1) {
    text("aztecGators", 500, 20);
  } else if (factions == 2) {
    text("romanWolfs", 500, 20);
  } else if (factions == 3) {
    text("cartageCrocs", 500, 20);
  }

  //point production
  if (factions > 0) {
    ptpccd = ptpccd - 1;
    if (ptpccd <= 0) {
      pt = pt + ptpc;
      ptpccd = ptpccdm;
      year = year + 1
      ageCheck();
    }

  }
  //planets and map (individual images should be drawn explicitly)
  //year gain
  
  //age progression
  //faction interactions and bonuses
}

//game interactions
function mousePressed() {
  //permenet faction selection
  if (
    mouseX > 10 &&
    mouseX < 110 &&
    mouseY > 80 &&
    mouseY < 180 &&
    factions == 0
  ) {
    factions = 1;
  }
  if (
    mouseX > 120 &&
    mouseX < 220 &&
    mouseY > 80 &&
    mouseY < 180 &&
    factions == 0
  ) {
    factions = 2;
  }
  if (
    mouseX > 10 &&
    mouseX < 110 &&
    mouseY > 190 &&
    mouseY < 290 &&
    factions == 0
  ) {
    factions = 3;
  }
  //planet claiming 

}

//faction selection
function factionSelect() {
  if (mouseX > 10 && mouseX < 110 && mouseY > 80 && mouseY < 180) {
    console.log("aztecGators");
    text("aztec", 500, 20);
  }
  if (mouseX > 120 && mouseX < 220 && mouseY > 80 && mouseY < 180) {
    console.log("romanWolfs");
    text("rome", 500, 20);
  }
  if (mouseX > 10 && mouseX < 110 && mouseY > 190 && mouseY < 290) {
    console.log("cartageCrocs");
    text("cartage", 500, 20);
  }
  if (mouseX > 120 && mouseX < 220 && mouseY > 190 && mouseY < 290) {
    console.log("faction4");
    text("faction4", 500, 20);
  }
  if (mouseX > 10 && mouseX < 110 && mouseY > 300 && mouseY < 400) {
    console.log("faction5");
    text("faction5", 500, 20);
  }
  if (mouseX > 120 && mouseX < 220 && mouseY > 300 && mouseY < 400) {
    console.log("faction6");
    text("faction6", 500, 20);
  }
  if (mouseX > 10 && mouseX < 110 && mouseY > 410 && mouseY < 510) {
    console.log("faction7");
    text("faction7", 500, 20);
  }
  if (mouseX > 120 && mouseX < 220 && mouseY > 410 && mouseY < 510) {
    console.log("faction8");
    text("faction8", 500, 20);
  }
}

//planet randomization
function planetRandomizer(count) {

  count = count || 8;
  placedPlanets = [];
  if (!planets || planets.length === 0) return;
  let available = planets.filter((p) => p);
  if (available.length === 0) return;
  for (let i = 0; i < count; i++) {
    let img = random(available);
    let x = random(220, width - 50);
    let y = random(75, height - 50);
    placedPlanets.push({ img, x, y });
    //need limeter 


  }
}
//the year system and age progression will be based on points and time.
function progressAge1() {
  // Implementation for age progression based on points and time
  ages=1
}
function progressAge2() {

  ages = 2;
}

function progressAge3() {

  ages = 3;
}

function progressAge4() {

  ages = 4;
}
function progressAge5(){
  ages =5;
}
function progressAge6(){
  ages = 6;
}
function progressAge7(){
  ages = 7
}
function progressAge8(){
  ages = 7
}
//check every 100 frames
function ageCheck(){
  if(year=2500){
    progressAge1();
  }
  if (year = 2750) {
    progressAge2();
  }
  if (year = 3000) {
    progressAge3();
  }
  if (year=3250){
    progressAge4();
  }
   if (year = 3500) {
     progressAge5();
   }
   if (year = 3750) {
     progressAge6();
   }
   if (year = 4000) {
     progressAge7();
   }
   if (year = 4250) {
     progressAge8();
   }
}