import * as THREE from "/build/three.module.js";
import CameraEntity from "./CameraEntity.js";
import { OrbitControls } from '/build/jsm/controls/OrbitControls.js';


export default class OrbitalCameraEntity extends CameraEntity {
  /**
   *
   */
  constructor(renderer) {
    super(renderer , 'OrbitalCamera');

    // Câmera de inspeção (OrbitControls)
    this.camera.position.set(0, 30, -70);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 1));
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }
}
