import { colorMap } from "../../constants/maps/maps.js";
import Entity from "../../core/Entity.js";
import * as THREE from "/build/three.module.js";

import { setDefaultMaterial } from "/src/libs/util/util.js";

export default class VoxelEntity extends Entity {
  constructor() {
    super("Voxel");
    this.voxel;
    this.voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.offset = 0.5;
  }

  build(position, type) {
    //debugger;

    const color = colorMap[type] ?? "white";
    const voxelMaterial = new THREE.MeshBasicMaterial({ color: color });
    //const voxelMaterial = setDefaultMaterial(colorMap[type]);
    this.voxel = new THREE.Mesh(this.voxelGeometry, voxelMaterial);

    this.voxel.position.x = position.x + this.offset;
    this.voxel.position.y = position.y + this.offset;
    this.voxel.position.z = position.z + this.offset;
    this.voxel.name = `voxel-${position.x}-${position.y}-${position.z}`;
    this.voxel.type = type;

    return this.voxel;
  }

  static build(position, type) {
    //debugger;

    const color = colorMap[type] ?? "white";
    const voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
    const voxelMaterial = new THREE.MeshBasicMaterial({ color: color });
    //const voxelMaterial = setDefaultMaterial(colorMap[type]);
    const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);
    const offset = 0.5;

    voxel.position.x = position.x + offset;
    voxel.position.y = position.y + offset;
    voxel.position.z = position.z + offset;
    voxel.name = `voxel-${position.x}-${position.y}-${position.z}`;
    voxel.type = type;

    return voxel;
  }
}
