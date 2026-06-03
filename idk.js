
//images
function preload() {
  try {
    pressStart = loadFont("PressStart2P-Regular.ttf");
  } catch (e) {
    console.log("Font not loaded, using default");
  }

  
    //factions
    aztecGators = loadImage("aztecGators.png");
    romanWolfs =loadImage("romanWolfs.png")



  //planets
  wPlanets = loadImage("waterPlanet.png");
  dPlanets = loadImage("desertPlanet.png");
  iPlanets = loadImage("frozenPlanet.png");
  //gPlanets = loadImage("giaPlanets.png");

  // populate planets array only after images are loaded
  planets = [wPlanets, dPlanets, iPlanets /*gPlanets*/];

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
  text("game and art by fuzzy_foxf", 10, 770);

  //game info
  text("Points:" + pt, 10, 20);
  text("Points per capital:" + ptpc, 10, 40);
  text("production timer:" + ptpccd, 10, 60);
  text("year:" + yearWhy, 10, 730);
  text("age:" + ages, 10,750 )

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
      yearWhy = yearWhy + 1;
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
  //cursser is over the screen
  if (mouseX < 0) mouseX = 0;
  if (mouseX > width) mouseX = width;
  if (mouseY < 0) mouseY = 0;
  if (mouseY > height) mouseY = height;
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
    console.log("cartageCamels");
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

//check every 100 frames
function ageCheck() {
  if (yearWhy>=2250){
    ages=1;
  }

 
}
