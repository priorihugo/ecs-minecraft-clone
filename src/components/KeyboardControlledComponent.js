import Component from "../core/Component.js";

export default class KeyboardControlledComponent extends Component {
  constructor(position, velocity) {
    super();
    var v = 0.005;
    this.commands = {
      moveRight: (down, pressed, up) => {
        if (pressed) velocity.x = v;
        if (up) velocity.x = 0;
      },
      moveLeft: (down, pressed, up) => {
        if (pressed) velocity.x = -v;
        if (up) velocity.x = 0;
      },
      moveForward: (down, pressed, up) => {
        if (pressed) velocity.z = v;
        if (up) velocity.z = 0;
      },
      moveBackward: (down, pressed, up) => {
        if (pressed) velocity.z = -v;
        if (up) velocity.z = 0;
      }
    };
  }

  executeCommand(command, { down, pressed, up }) {
    //debugger

    if (this.commands[command]) {
      this.commands[command](down, pressed, up);
    } else {
      console.error("Comando desconhecido", command);
    }
  }
}
