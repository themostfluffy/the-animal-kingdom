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
  try {
    romanWolfs = loadImage("romanWolfs.png");
  } catch (e) {
    console.log("romanWolfs image not loaded");
  }

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

  // FACTION DISPLAY - EARLY SO IT ALWAYS SHOWS
  fill(255, 0, 0); // Red background
  rect(400, 10, 300, 50);
  fill(255); // White text
  textSize(20);
  if (factions == 0) {
    text("SELECT FACTION", 420, 40);
  } else if (factions == 1) {
    text("GATORS SELECTED", 420, 40);
  } else if (factions == 2) {
    text("WOLFS SELECTED", 420, 40);
  } else if (factions == 3) {
    text("FOXES SELECTED", 420, 40);
  }
  textSize(16);

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
  if (romanWolfs) {
    image(romanWolfs, 120, 80, 100, 100);
  } else {
    fill(0);
    rect(120, 80, 100, 100);
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
  text("pt production timer:" + ptpccd, 10, 60);
  text("year:" + yearWhy, 10, 730);
  text("age:" + ages, 10, 750);
  text(
    "planets owned:" +
      (waterPlanets + desertPlanets + icePlanets + gaiaPlanets),
    10,
    790,
  );
  text("water planets:" + waterPlanets, 10, 810);
  text("desert planets:" + desertPlanets, 10, 830);
  text("ice planets:" + icePlanets, 10, 850);
  text("gaia planets:" + gaiaPlanets, 10, 870);

  //point production
  if (factions > 0) {
    ptpccd = ptpccd - 1;
    if (ptpccd <= 0) {
      pt = pt + ptpc + waterPlanets + desertPlanets + icePlanets + gaiaPlanets;
      ptpccd = ptpccdm;
      yearWhy = yearWhy + 1;
      ageCheck();
    }
  }
  //planets and map (individual images should be drawn explicitly)
  //year gain

  //age progression
  //faction interactions and bonuses

  //foxfactionBonuses();  // TODO: define this function
}

//game interactions
function mousePressed() {
  //permenet faction selection
  console.log("Click at:", mouseX, mouseY, "Factions:", factions);

  if (
    mouseX > 10 &&
    mouseX < 110 &&
    mouseY > 80 &&
    mouseY < 180 &&
    factions == 0
  ) {
    console.log("Selected faction 1");
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
  if (factions > 0) {
    for (let p of placedPlanets) {
      if (
        mouseX > p.x &&
        mouseX < p.x + 50 &&
        mouseY > p.y &&
        mouseY < p.y + 50
      ) {
        // code to claim the planet and add it to the player's resources
        if (p.img === wPlanets) {
          waterPlanets = waterPlanets + 1;
        } else if (p.img === dPlanets) {
          desertPlanets = desertPlanets + 1;
        } else if (p.img === iPlanets) {
          icePlanets = icePlanets + 1;
        } else if (p.img === gPlanets) {
          gaiaPlanets = gaiaPlanets + 1;
        }

        // maybe use a list variable to store the claimed planets and use it in the game logic
      }
    }
  }
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
  if (yearWhy >= 2250) {
    ages = 1;
  }
}
