import * as THREE from "/build/three.module.js";
import Scene from "/src/core/Scene.js";
import ChunkEntity from "/src/entities/blocos/ChunkEntity.js";

import OrbitalCameraEntity from "/src/entities/Cameras/OrbitalCameraEntity.js";
import FirstPersonCameraEntity from "/src/entities/Cameras/FirstPersonCameraEntity.js";

import RenderChunkSystem from "/src/systems/Chunk/RenderChunkSystem.js";
import RenderSystem from "/src/systems/RenderSystem.js";
import KeyboardInputSystem from "/src/systems/KeyboardInputSystem.js";
import MovementSystem from "/src/systems/MovementSystem.js";

import {
  initRenderer,
  initDefaultBasicLight,
  setDefaultMaterial,
  onWindowResize,
  createGroundPlaneXZ,
  createGroundPlaneWired
} from "/src/libs/util/util.js";

export default class BuilderScene extends Scene {
  constructor() {
    super("Main");

    this.scene = new THREE.Scene();
    this.renderer = initRenderer();
    this.light = initDefaultBasicLight(this.scene);

    this.fpCamera = new FirstPersonCameraEntity(this.renderer);
    this.orbitalCamera = new OrbitalCameraEntity(this.renderer);
    this.isInspectionMode = false;

    this.cameras.push(this.orbitalCamera);
    this.cameras.push(this.fpCamera);
    this.activeCamera = this.orbitalCamera;

    this.initialize();
  }

  initialize() {
    // Criar material básico e luz
    this.material = setDefaultMaterial();
    this.light = initDefaultBasicLight(this.scene);

    // Criar plano de chão
    this.plane = createGroundPlaneWired(10, 10 , 10 , 10);
    this.plane.material.opacity = 0.2;
    this.plane.material.transparent = true;
    this.scene.add(this.plane);

    // Cria o cubo wireframe
    this.wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    this.wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(this.wireframeGeometry),
      this.wireframeMaterial
    );
    this.wireframe.position.set(0.5, 0.5, 0.5); // Altura padrão inicial
    this.scene.add(this.wireframe);

    this.addEntity(this.fpCamera);
    this.addEntity(this.orbitalCamera);

    const globalKeyActionMap = {
      arrowUp: "moveBlockForward",
      up: "moveBlockForward",

      arrowDown: "moveBlockBackward",
      down: "moveBlockBackward",

      arrowLeft: "moveBlockLeft",
      left: "moveBlockLeft",

      arrowRight: "moveBlockRight",
      right: "moveBlockRight",

      pageUp: "moveBlockUp",
      pageDown: "moveBlockDown",

      ".": "nextVoxelType",
      ",": "previousVoxelType",

      q: "addVoxel",
      Q: "addVoxel",

      e: "removeVoxel",
      E: "removeVoxel",

      c:'toggleCamera',
      C:'toggleCamera'
    };

    this.addSystem(
      new KeyboardInputSystem(this, { globalKeyActionMap: globalKeyActionMap })
    );
  }

  toggleCamera() {
    if (this.isInspectionMode) {
      this.activeCamera = this.fpCamera;
      this.isInspectionMode = false;
      console.log("Modo: Primeira Pessoa");
    } else {
      // Alterna para câmera de inspeção
      this.activeCamera = this.orbitalCamera;
      this.isInspectionMode = true;
      console.log("Modo: Inspeção");
    }
  }

  update(dt) {
    // let axesHelper = new THREE.AxesHelper(12);
    // let plane = createGroundPlaneXZ(70, 70);

    this.scene.clear();

    //this.scene.add(axesHelper);
    this.scene.add(this.plane);
    this.scene.add(this.wireframe);

    //debugger;
    super.update(dt);
    this.renderer.render(this.scene, this.activeCamera.camera);
  }

  getWireframe() {
    return this.wireframe;
  }
}
