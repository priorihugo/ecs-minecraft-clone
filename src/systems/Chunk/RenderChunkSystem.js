import * as THREE from "/build/three.module.js";

import TransformComponent from "../../components/TransformComponent.js";
import VoxelDataComponent from "../../components/VoxelDataComponent.js";
import System from "../../core/System.js";

import { createGroundPlaneXZ , setDefaultMaterial } from "/src/libs/util/util.js";
import VoxelEntity from "../../entities/blocos/VoxelEntity.js";

export default class RenderChunkSystem extends System{
  
  constructor(scene) {
    super();
    this.scene = scene;
  }

  update(entities , dt) {

    entities.forEach((entity) => {

      if(entity == null)
        debugger
      
      const transform = entity.getComponent(TransformComponent);
      const chunkData = entity.getComponent(VoxelDataComponent);

      if (transform && chunkData) {
        const chunkMesh = this.createChunkMesh(chunkData.voxels);

        chunkMesh.position.set(
          transform.position.x,
          transform.position.y,
          transform.position.z
        );
        this.scene.add(chunkMesh);
      }
    });
  }
  
  createVoxel = (position , type)=>{
    const colorMap = {
      1: 0x00ff00,
      2: 0xffa500,
      3: 0xd3d3d3,
      4: 0x654321,
      5: 0x056105
    };

    var c = colorMap[type];
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: c });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x + 0.5 , position.y + 0.5, position.z + 0.5);

    return cube;
  }

  createChunkMesh = (blocks) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const group = new THREE.Group();

    const colorMap = {
      1: 0x00ff00,
      2: 0xffa500,
      3: 0xd3d3d3,
      4: 0x654321,
      5: 0x056105
    };

    for (let x = 0; x < blocks.length; x++) {
      for (let y = 0; y < blocks[x].length; y++) {
        for (let z = 0; z < blocks[x][y].length; z++) {

          
          //TODO::trabalhar com dicionario de tipo de blocos
          if (this.hasAdjacentEmpty(blocks , x , y , z) && blocks[x][y][z] != 0) {
            //debugger;
            // var type = blocks[x][y][z];  
            // group.add(this.createVoxel({x , y , z},type));

            var p = blocks[x][y][z];
            var c = colorMap[p];

            const material = new THREE.MeshBasicMaterial({ color: c });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x + 0.5 , y + 0.5, z + 0.5);
            
            group.add(cube);
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
