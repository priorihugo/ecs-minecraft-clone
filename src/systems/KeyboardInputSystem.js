import KeyboardControlledComponent from "../components/KeyboardControlledComponent.js";
import { awsdMovement, cameraMovement } from "../constants/maps/controls.js";
import System from "../core/System.js";
import KeyboardState from "../libs/util/KeyboardState.js";

//A ideia deste sistema é mapear todas as ações possiveis no teclado para os resultados em tela
//Não gostei muito da implementação, contudo a ideia é a seguinte
//para cada possivel ação realizada no teclado, o sistema ira buscar as entidades que possuem um componente relacionado
//por exemplo: caso a ação seja de correr, o sistema buscara pela entidade que tem um componente que
//indica que este é controlado pelo teclado e pode correr
export default class KeyboardInputSystem extends System {
  constructor(sceneClass, keyActionMap = null, globalKeyActionMap = null) {
    super();
    this.keyboard = new KeyboardState();
    this.scene = sceneClass;

    //TODO::virar constante ou injetado por construtor?

    if (keyActionMap == null) {
      this.keyActionMap = awsdMovement;
    } else {
      this.keyActionMap = keyActionMap;
    }

    if (globalKeyActionMap == null) {
      this.globalKeyActionMap = cameraMovement;
    } else {
      this.globalKeyActionMap = globalKeyActionMap;
    }
  }

  update(entities, dt) {
    this.keyboard.debug();
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
    const step = 1;
    const systemScope = this;

    function toggleCamera(keyboardState) {
      console.log("Câmera alternada");
      // Aqui você pode acessar o estado das teclas (keyboardState)
      if (keyboardState.down) systemScope.scene?.toggleCamera();
    }

    function moveCameraLeft(keyboardState) {
      console.log("Movendo a câmera para a esquerda");
      var cameraClass = systemScope.scene?.getActiveCamera();
    }

    function moveCameraRight(keyboardState) {
      console.log("Movendo a câmera para a direita");
      var cameraClass = systemScope.scene?.getActiveCamera();
    }

    function moveCameraUp(keyboardState) {
      console.log("Movendo a câmera para cima");
      var cameraClass = systemScope.scene?.getActiveCamera();
    }

    function moveCameraDown(keyboardState) {
      console.log("Movendo a câmera para baixo");
      var cameraClass = systemScope.scene?.getActiveCamera();
    }

    function moveCameraForward(keyboardState) {
      console.log("Movendo a câmera para frente");
      var cameraClass = systemScope.scene?.getActiveCamera();
    }

    function moveCameraBackward(keyboardState) {
      console.log("Movendo a câmera para trás");
      var cameraClass = systemScope.scene?.getActiveCamera();
    }

    function moveBlockLeft(keyboardState) {
      console.log("Movendo o bloco para a esquerda");
      if (keyboardState.down) {
        var block = systemScope.scene?.getWireframe();
        block.position.x += step;
      }
    }

    function moveBlockRight(keyboardState) {
      console.log("Movendo o bloco para a direita");
      if (keyboardState.down) {
        var block = systemScope.scene?.getWireframe();
        block.position.x -= step;
      }
    }

    function moveBlockUp(keyboardState) {
      console.log("Movendo o bloco para cima");
      if (keyboardState.down) {
        var block = systemScope.scene?.getWireframe();
        block.position.z += step;
      }
    }

    function moveBlockDown(keyboardState) {
      console.log("Movendo o bloco para baixo");
      if (keyboardState.down) {
        var block = systemScope.scene?.getWireframe();
        block.position.z -= step;
      }
    }

    function moveBlockForward(keyboardState) {
      console.log("Movendo o bloco para frente");
      if (keyboardState.down) {
        var block = systemScope.scene?.getWireframe();
        block.position.z += step;
      }
    }

    function moveBlockBackward(keyboardState) {
      console.log("Movendo o bloco para trás");
      if (keyboardState.down) {
        var block = systemScope.scene?.getWireframe();
        block.position.z -= step;
      }
    }

    function nextVoxelType(keyboardState) {
      if (keyboardState.down) systemScope.scene?.nextVoxelType();
    }
    function previousVoxelType(keyboardState) {
      if (keyboardState.down) systemScope.scene?.previousVoxelType();
    }
    function addVoxel(keyboardState) {
      if (keyboardState.down) systemScope.scene?.addVoxel();
    }
    function removeVoxel(keyboardState) {
      if (keyboardState.down) systemScope.scene?.removeVoxel();
    }

    const GlobalActionMap = {
      // Para as ações da câmera
      toggleCamera: toggleCamera,
      moveCameraLeft: moveCameraLeft,
      moveCameraRight: moveCameraRight,
      moveCameraUp: moveCameraUp,
      moveCameraDown: moveCameraDown,
      moveCameraForward: moveCameraForward,
      moveCameraBackward: moveCameraBackward,

      // Para as ações do bloco
      moveBlockLeft: moveBlockLeft,
      moveBlockRight: moveBlockRight,
      moveBlockUp: moveBlockUp,
      moveBlockDown: moveBlockDown,
      moveBlockForward: moveBlockForward,
      moveBlockBackward: moveBlockBackward,
      nextVoxelType: nextVoxelType,
      previousVoxelType: previousVoxelType,
      addVoxel: addVoxel,
      removeVoxel: removeVoxel
    };

    if (GlobalActionMap[command]) {
      GlobalActionMap[command]({ down, pressed, up });
    }
  }
}
