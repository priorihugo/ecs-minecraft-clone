import Entity from "../../core/Entity.js";

import TransformComponent from "../../components/TransformComponent.js";
import VoxelDataComponent from "../../components/VoxelDataComponent.js";

export default class ChunkEntity extends Entity {
  constructor({ position, voxelData }) {
    super("Chunk");
    //coordenadas globais
    this.addComponent(new TransformComponent(position));
    //TODO::
    const t = new VoxelDataComponent(voxelData);
    t.voxels = t.generateChunkData()

    this.addComponent(t);
  }
}
