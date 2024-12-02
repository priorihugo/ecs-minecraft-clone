import KeyboardControlledComponent from "../../components/KeyboardControlledComponent.js";
import MovementComponent from "../../components/MovementComponent.js";
import TransformComponent from "../../components/TransformComponent.js";
import CameraEntity from "./CameraEntity.js";
import {  PointerLockControls } from '/build/jsm/controls/PointerLockControls.js';

export default class FirstPersonCameraEntity extends CameraEntity {
  /**
   *
   */
  constructor(renderer) {
    super(renderer , 'FirstPersonCamera');

    let transform = new TransformComponent({ x: 0, y: 13, z: 30 });
    let movement = new MovementComponent({ x: 0, y: 0, z: 0 })

    this.addComponent(transform);
    this.addComponent(movement);
    this.addComponent(new KeyboardControlledComponent(transform.position , movement.velocity));

    this.camera.position.set(0, 13, 30);
    this.pointerLockControls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    );
  }
}
