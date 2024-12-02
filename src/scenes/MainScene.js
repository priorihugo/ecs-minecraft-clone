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
  onWindowResize,
  createGroundPlaneXZ
} from "/src/libs/util/util.js";


export default class MainScene extends Scene {
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

  //cria todas as entidades e sistemas de uma cena
  initialize() {
    this.entities = [];
    this.systems = [];

    //TESTE DE CHUNK
    const blockMap = {
      vazio: 0,
      terra: 1,
      pedra: 2,
      madeira: 3
    };


    this.addEntity(
      new ChunkEntity({
        position: { x: 0, y: 0, z: 0 },
        voxelData: { voxels: [], size: 35, voxelBlockMap: blockMap }
      })
    );
    this.addEntity(this.fpCamera);
    this.addEntity(this.orbitalCamera);

    this.addSystem(new KeyboardInputSystem(this , {}));
    this.addSystem(new MovementSystem());
    this.addSystem(new RenderChunkSystem(this.scene));
    this.addSystem(new RenderSystem(this.scene));
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
    //GAMBIARRA, o controle do renderer deveria ser um sistema Independente
    let axesHelper = new THREE.AxesHelper(12);
    let plane = createGroundPlaneXZ(70, 70);

    this.scene.clear();

    this.scene.add(axesHelper);
    this.scene.add(plane);

    //debugger;
    super.update(dt);
    this.renderer.render(this.scene, this.activeCamera.camera);
  }
}
