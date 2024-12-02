import KeyboardControlledComponent from "../components/KeyboardControlledComponent.js";
import System from "../core/System.js";
import KeyboardState from "../libs/util/KeyboardState.js";

//A ideia deste sistema é mapear todas as ações possiveis no teclado para os resultados em tela
//Não gostei muito da implementação, contudo a ideia é a seguinte
//para cada possivel ação realizada no teclado, o sistema ira buscar as entidades que possuem um componente relacionado
//por exemplo: caso a ação seja de correr, o sistema buscara pela entidade que tem um componente que
//indica que este é controlado pelo teclado e pode correr

export default class KeyboardInputSystem extends System {
  constructor(sceneClass
    , { keyActionMap, globalKeyActionMap }
  ) {
    super();
    this.keyboard = new KeyboardState();
    this.scene = sceneClass;

    //TODO::virar constante ou injetado por construtor?
    this.keyActionMap = {
      // arrowUp: "moveUp", // Cima
      // arrowDown: "moveDown", // Baixo
      arrowLeft: "moveLeft", // Esquerda
      arrowRight: "moveRight", // Direita
      up: "moveUp", // Cima
      down: "moveDown", // Baixo
      left: "moveLeft", // Esquerda
      right: "moveRight", // Direita
      w: "moveForward", // Frente
      s: "moveBackward" // Trás
    };
    
    if (globalKeyActionMap) {
      this.globalKeyActionMap = globalKeyActionMap;
    } else {
      this.globalKeyActionMap = {
        c: "toggleCamera", // Trocar Camera
        C: "toggleCamera" // Trocar Camera
       };
    }
  }

  update(entities, dt) {
    this.keyboard.update();
    var updatedKeys = this.keyboard.getStatus();

    for (const [key, value] of Object.entries(updatedKeys)) {
      var command = this.keyActionMap[key?.toLowerCase()];
      if (command) {
        entities.forEach((entity) => {
          const inputComponent = entity.getComponent(
            KeyboardControlledComponent
          );
          if (inputComponent) {
            inputComponent.executeCommand(command, {
              down: value.down,
              pressed: value.pressed,
              up: value.up
            });
          }
        });
      }

      var globalCommand = this.globalKeyActionMap[key];
      if (globalCommand)
        this.executeGlobalCommand(globalCommand, {
          down: value.down,
          pressed: value.pressed,
          up: value.up
        });
    }
  }

  executeGlobalCommand(command, { down, pressed, up }) {
    var wireframe = this.scene?.getWireframe();
    const step = 1;

    switch (command) {
      case "toggleCamera":
        if (down) this.scene?.toggleCamera();
        break;
      case "moveBlockForward":
        if (down) wireframe.position.z -= step;
        break;
      case "moveBlockBackward":
        if (down) wireframe.position.z += step;
        break;
      case "moveBlockLeft":
        if (down) wireframe.position.x += step;
        break;
      case "moveBlockRight":
        if (down) wireframe.position.x -= step;
        break;
      case "moveBlockUp":
        if (down) wireframe.position.y += step;
        break;
      case "moveBlockDown":
        if (down) wireframe.position.y -= step;
        break;
      case "nextVoxelType":
        // Implementação para mudar para o próximo tipo de voxel

        break;
      case "previousVoxelType":
        // Implementação para mudar para o tipo de voxel anterior

        break;
      case "addVoxel":
        // Implementação para adicionar um voxel

        break;
      case "removeVoxel":
        // Implementação para remover um voxel

        break;
      default:
        break;
    }
  }
}
