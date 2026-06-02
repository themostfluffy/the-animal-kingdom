//points/economy for player
var pt = 0;
//year
var yearWhy = 2250;
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
var notplaying;
var earlySpaceAge;
var starExplorationAge;
var ionicPropultionAge;
var darkMatterDiscoveryAge;
var darkMatterResearchAge;
var darkMatterUtilizationAge;
var intergalacticTravelAge;
var intergalacticEmpireAge;
var ages = [
  notPlaying,
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
