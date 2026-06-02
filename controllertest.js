let pressStart;
let gamepadConnected = false;
let gamepadIndex = null;
let gamepadPrevButtons = [];
let gamepadDeadzone = 0.3;
let cursorX = 400;
let cursorY = 300;
let cursorSpeed = 6;
let selectedAction = 0;
let actions = ["Select faction", "Claim planet", "Boost points"];
let statusText = "Connect a gamepad and press any button.";



function setup() {

  window.addEventListener("gamepadconnected", onGamepadConnected);
  window.addEventListener("gamepaddisconnected", onGamepadDisconnected);
}

function draw() {
  background(20);

  fill(255);
  textSize(28);
  text("Generic Gamepad Controller Test", width / 2, 60);

  textSize(18);
  

    if (hoverAction >= 0) {
      selectedAction = hoverAction;
    }

    fill(255, 255, 0);
    noStroke();
    ellipse(cursorX, cursorY, 18, 18);
    stroke(255, 255, 0);
    strokeWeight(2);
    noFill();
    ellipse(cursorX, cursorY, 30, 30);
    noStroke();
    textSize(14);
    text(
      "Cursor: (" + floor(cursorX) + ", " + floor(cursorY) + ")",
      width / 2,
      200,
    );
  }

  updateGamepad();


function onGamepadConnected(event) {
  gamepadConnected = true;
  gamepadIndex = event.gamepad.index;
  gamepadPrevButtons = new Array(event.gamepad.buttons.length).fill(false);
  statusText = "Gamepad connected. Use it now.";
}

function onGamepadDisconnected(event) {
  if (event.gamepad.index === gamepadIndex) {
    gamepadConnected = false;
    gamepadIndex = null;
    gamepadPrevButtons = [];
    statusText = "Gamepad disconnected. Reconnect to continue.";
  }
}

function updateGamepad() {
  if (!navigator.getGamepads) return;
  const gamepads = navigator.getGamepads();
  if (!gamepads) return;

  let gamepad = null;
  if (gamepadIndex !== null) {
    gamepad = gamepads[gamepadIndex];
  }
  if (!gamepad) {
    for (let i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        gamepad = gamepads[i];
        gamepadIndex = i;
        break;
      }
    }
  }
  if (!gamepad) return;

  const axes = gamepad.axes;
  const buttons = gamepad.buttons;
  const stickX = Math.abs(axes[0]) > gamepadDeadzone ? axes[0] : 0;
  const stickY = Math.abs(axes[1]) > gamepadDeadzone ? axes[1] : 0;
  const dpadLeft = buttons[14]?.pressed;
  const dpadRight = buttons[15]?.pressed;
  const dpadUp = buttons[12]?.pressed;
  const dpadDown = buttons[13]?.pressed;

  if (stickX !== 0 || stickY !== 0) {
    cursorX = constrain(cursorX + stickX * cursorSpeed, 0, width);
    cursorY = constrain(cursorY + stickY * cursorSpeed, 0, height);
  }

  if (dpadLeft || buttonPressed(buttons, 14)) {
    cursorX = constrain(cursorX - cursorSpeed, 0, width);
  }
  if (dpadRight || buttonPressed(buttons, 15)) {
    cursorX = constrain(cursorX + cursorSpeed, 0, width);
  }
  if (dpadUp || buttonPressed(buttons, 12)) {
    cursorY = constrain(cursorY - cursorSpeed, 0, height);
  }
  if (dpadDown || buttonPressed(buttons, 13)) {
    cursorY = constrain(cursorY + cursorSpeed, 0, height);
  }

  if (buttonPressed(buttons, 0)) {
    statusText =
      "Pressed A at cursor (" + floor(cursorX) + ", " + floor(cursorY) + ")";
  }

  gamepadPrevButtons = buttons.map((b) => b.pressed);
}

function buttonPressed(buttons, index) {
  return buttons[index] && buttons[index].pressed && !gamepadPrevButtons[index];
}
