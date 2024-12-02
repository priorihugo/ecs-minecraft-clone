import Entity from "../../core/Entity.js";
import * as THREE from '/build/three.module.js';

import {
    setDefaultMaterial
  } from "/src/libs/util/util.js";

export default class VoxelEntity extends Entity {
  constructor() {
    super("Voxel");
    this.voxel;
    this.voxelGeometry = new THREE.BoxGeometry(1, 1, 1);

    this.offset = 0.5;
  }
  buildVoxel(position, type) {
    const colorMap = {
      1: 0x00ff00,
      2: 0xffa500,
      3: 0xd3d3d3,
      4: 0x654321,
      5: 0x056105
    };

    const voxelMaterial = setDefaultMaterial(colorMap[type]);
    this.voxel = new THREE.Mesh(this.voxelGeometry, voxelMaterial);

    this.voxel.position.x = position.x + this.offset;
    this.voxel.position.y = position.y + this.offset;
    this.voxel.position.z = position.z + this.offset;
    this.voxel.name = `voxel-${position.x}-${position.y}-${position.z}`;

    return this.voxel;
  }
}
