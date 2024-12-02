import System from "../core/System.js";
import MeshComponent from "./../components/MeshComponent.js";

export default class RenderSystem extends System {
  constructor(scene) {
    super();
    this.scene = scene;
  }

  update(entities, dt) {
    //debugger;
    entities.forEach((entity) => {
      const meshComponent = entity.getComponent(MeshComponent);
      if (meshComponent) {
        this.scene.add(meshComponent.mesh);
      }
    });
  }
}
