#learn this :p
#shows error if image not loaded, but still runs the code
let pressStart;
let aztecGators;
let romanWolfs;
let wPlanets;   
function preload() {
  try {
    pressStart = loadFont("PressStart2P-Regular.ttf");
  }catch (e) {
    console.log("Font not loaded, using default");
    pressStart = createFont("Arial"); // Fallback to default font
  }
  try {
    aztecGators = loadImage("aztec_gators.png");
  }catch (e) {
    console.log("Aztec Gators image not loaded, using placeholder");
    aztecGators = createGraphics(100, 100); // Placeholder graphic
    aztecGators.background(255, 0, 0); // Red background for visibility