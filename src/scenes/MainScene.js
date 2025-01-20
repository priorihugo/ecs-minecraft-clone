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
import { awsdMovement, cameraMovement } from "../constants/maps/controls.js";
import ChunkManagerSystem from "/src/systems/Chunk/ChunkManager.js";

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

    this.addEntity(this.fpCamera);
    this.addEntity(this.orbitalCamera);

    this.addSystem(
      new KeyboardInputSystem(this, awsdMovement, {
        c: "toggleCamera",
        C: "toggleCamera"
      })
    );
    this.addSystem(new MovementSystem());
    this.addSystem(new ChunkManagerSystem(this));
    this.addSystem(new RenderChunkSystem(this.scene));
    //this.addSystem(new RenderSystem(this.scene));
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
    //this.scene.clear();
    super.update(dt);
    this.renderer.render(this.scene, this.activeCamera.camera);
  }
}
