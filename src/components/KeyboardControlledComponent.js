import Component from "../core/Component.js";

export default class KeyboardControlledComponent extends Component {
  constructor(position, velocity) {
    super();

    // arrowUp: "moveUp",        // Cima
    // arrowDown: "moveDown",    // Baixo
    // arrowLeft: "moveLeft",    // Esquerda
    // arrowRight: "moveRight",  // Direita
    // w: "moveForward",         // Frente
    // s: "moveBackward",        // Trás
    // space: "jump",            // Pular
    // enter: "interact",        // Interagir
    // escape: "pause"           // Pausar


    var v = 0.005;

    this.commands = {
      // moveUp: (down, pressed, up) => {
      //   if (pressed) velocity.y = v;
      //   if (up) velocity.y = 0;
      // },
      // moveDown: (down, pressed, up) => {
      //   if (pressed) velocity.y = -v;
      //   if (up) velocity.y = 0;
      // },
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
      //   jump: (down, pressed, up) => {
      //     if (pressed) velocity.y = 10;
      //     if (up) velocity.y = 0;
      //   },
      //   interact: (down, pressed, up) => {
      //     if (pressed) {
      //       console.log("Interacting with object");

      //     }
      //   },
      //   pause: (down, pressed, up) => {
      //     if (pressed) {
      //       console.log("Game Paused");

      //     }
      //   }
    };
  }

  executeCommand(command, { down, pressed, up }) {

    //debugger

    if (this.commands[command]) {
      this.commands[command](down, pressed, up);
    } else {
      console.error("Comando desconhecido");
    }
  }
}
