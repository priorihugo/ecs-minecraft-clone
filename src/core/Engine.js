import {
  initRenderer,
  initDefaultBasicLight,
  onWindowResize,
  createGroundPlaneXZ
} from "/src/libs/util/util.js";

export default class Engine {
  constructor() {
    this.currentScene = null;
  }

  changeScene(scene) {
    if (this.currentScene) {
      var c = this.currentScene;
      this.currentScene.cameras.forEach((camera) => {
        window.removeEventListener(
          "resize",
          function () {
            onWindowResize(camera.camera, c.renderer);
          },
          false
        );
      });
    }

    this.currentScene = scene;

    if (this.currentScene) {
      var c = this.currentScene;
      this.currentScene.cameras.forEach((camera) => {
        window.addEventListener(
          "resize",
          function () {
            onWindowResize(camera.camera, c.renderer);
          },
          false
        );
      });
    }
  }

  update(dt) {
    if (this.currentScene) {
      this.currentScene.update(dt);
    }
  }
}
