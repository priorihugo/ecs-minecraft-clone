import System from "../../core/System.js";
import ChunkEntity from "/src/entities/blocos/ChunkEntity.js";

export default class ChunkManagerSystem extends System {
  /**
   *
   */
  constructor(sceneClass) {
    //debugger;
    super();
    this.sceneClass = sceneClass;
    this.loadedChunks = new Map();
    this.maxLoaded = 9;
    this.startingX = 0;
    this.startingZ = 0;
    this.chunkSize = 35;
    this.maxDistance = 4;
    this.noise = new Noise(Math.random());
    this.createNewChunk();
  }

  update(dt) {
    //this.createNewChunk();
    super.update(dt);
  }

  createNewChunk() {
    let areaX = this.maxDistance,
      areaZ = this.maxDistance;

    for (let chunkX = -areaX; chunkX <= areaX; chunkX++) {
      for (let chunkZ = -areaZ; chunkZ <= areaZ; chunkZ++) {
        const chunkKey = `${chunkX},${chunkZ}`;
        var chunk = new ChunkEntity({
          position: {
            x: chunkX * this.chunkSize,
            y: 0,
            z: chunkZ * this.chunkSize
          },
          voxelData: {
            voxels: [],
            size: this.chunkSize,
            voxelBlockMap: null,
            noise: this.noise
          }
        });
        this.sceneClass.addEntity(chunk);
        this.loadedChunks.set(chunkKey, chunk);
      }
    }
  }
}
