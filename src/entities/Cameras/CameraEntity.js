import MovementComponent from "../../components/MovementComponent.js";
import TransformComponent from "../../components/TransformComponent.js";
import Entity from "../../core/Entity.js";

import * as THREE from "three";

export default class CameraEntity extends Entity {
  constructor(renderer , name = 'Camera') {
    super("Camera");

    console.log("Inicializando câmeras...");
    this.renderer = renderer;

    // Configurações comuns para ambas as câmeras
    this.fov = 75;
    this.aspect = window.innerWidth / window.innerHeight;
    this.near = 0.1;
    this.far = 500;

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
  }

  setPosition(transform){
    //debugger
    this.camera.position.set(transform?.position.x , transform?.position.y , transform?.position.z)
  }
}
