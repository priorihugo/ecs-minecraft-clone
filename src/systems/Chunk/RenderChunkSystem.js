import * as THREE from "/build/three.module.js";

import TransformComponent from "../../components/TransformComponent.js";
import ChunkDataComponent from "../../components/ChunkDataComponent.js";
import System from "../../core/System.js";
import VoxelEntity from "../../entities/blocos/VoxelEntity.js";
import { colorMap } from "../../constants/maps/maps.js";
import MeshComponent from "../../components/MeshComponent.js";

export default class RenderChunkSystem extends System {
  constructor(scene) {
    super();
    this.scene = scene;
  }

  update(entities, dt) {
    entities.forEach((entity) => {
      if (entity == null) debugger;

      const transform = entity.getComponent(TransformComponent);
      const chunkData = entity.getComponent(ChunkDataComponent);
      const meshComponent = entity.getComponent(MeshComponent);

      if (transform && chunkData && !meshComponent.rendered) {
        const chunkMesh =
          meshComponent.mesh ?? this.createChunkMesh(chunkData.voxels);

        chunkMesh.position.set(
          transform.position.x,
          transform.position.y,
          transform.position.z
        );

        this.scene.add(chunkMesh);
        meshComponent.rendered = true;
      }
    });
  }
  renderTrees = () => {};

  createChunkMesh = (blocks) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const group = new THREE.Group();

    for (let x = 0; x < blocks.length; x++) {
      for (let y = 0; y < blocks[x].length; y++) {
        for (let z = 0; z < blocks[x][y].length; z++) {
          //TODO::trabalhar com dicionario de tipo de blocos
          if (this.hasAdjacentEmpty(blocks, x, y, z) && blocks[x][y][z] != 0) {
            //if (blocks[x][y][z] != 0) {
            var type = blocks[x][y][z];
            var color = colorMap[type];

            const material = new THREE.MeshBasicMaterial({ color: color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x + 0.5, y + 0.5, z + 0.5);
            group.add(cube);
            // const voxel = VoxelEntity.build({ x, y, z }, type);
            // group.add(voxel);
          }
        }
      }
    }

    return group;
  };
  hasAdjacentEmpty = (blocks, x, y, z) => {
    const adjacentPositions = [
      { dx: 1, dy: 0, dz: 0 }, // Direita
      { dx: -1, dy: 0, dz: 0 }, // Esquerda
      { dx: 0, dy: 1, dz: 0 }, // Cima
      { dx: 0, dy: -1, dz: 0 }, // Baixo
      { dx: 0, dy: 0, dz: 1 }, // Frente
      { dx: 0, dy: 0, dz: -1 } // Trás
    ];

    for (const { dx, dy, dz } of adjacentPositions) {
      const nx = x + dx;
      const ny = y + dy;
      const nz = z + dz;
      if (
        nx >= 0 &&
        nx < blocks.length &&
        ny >= 0 &&
        ny < blocks[nx].length &&
        nz >= 0 &&
        nz < blocks[nx][ny].length
      ) {
        if (blocks[nx][ny][nz] === 0) {
          return true;
        }
      }
    }
    return false;
  };
}
