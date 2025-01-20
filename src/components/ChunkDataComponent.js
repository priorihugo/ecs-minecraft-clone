import { y0, y1 } from "../assets/models/matriz.js";
import Component from "../core/Component.js";

export default class ChunkDataComponent extends Component {
  constructor(position, { voxels = [], size = 16, voxelBlockMap, noise }) {
    //debugger;
    super();
    this.size = size;
    this.voxelBlockDictionary = voxelBlockMap;
    this.noise = noise;
    this.globalPosition = position;
    // this.noise = new Noise(Math.random());

    if (voxels === null || voxels.length == 0)
      //this.voxels = this.generateChunkData();
      this.voxels = this.proceduralGenerate();
    else this.voxels = voxels;

    //this.generateRandomTrees();
  }

  generateChunkData() {
    const blocks = [];
    for (let x = 0; x < this.size; x++) {
      blocks[x] = [];
      for (let y = 0; y < this.size; y++) {
        blocks[x][y] = [];
        for (let z = 0; z < this.size; z++) {
          //debugger;
          //blocks[x][y][z] = y <= 1 ? Math.floor(Math.random() * 3) + 1 : 0;
          if (y == 0) blocks[x][y][z] = 3;
          else if (y == 1) blocks[x][y][z] = y0[z][x];
          else if (y == 2) blocks[x][y][z] = y1[z][x];
          else blocks[x][y][z] = 0;
        }
      }
    }
    return blocks;
  }

  generateRandomTrees() {
    var treeCount = 6;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        for (let z = 0; z < this.size; z++) {
          if (
            this.hasAdjacentType(this.voxels, x, y, z, 0, false) &&
            this.hasAdjacentType(this.voxels, x, y, z, 1, false)
          ) {
            if (Math.random() < 0.05) {
              this.voxels[x][y][z] = 9;
              treeCount--;

              if (treeCount == 0) return;
            }
          }
        }
      }
    }
  }

  hasAdjacentType = (blocks, x, y, z, type, vertical = false) => {
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
      const ny = vertical ? y + dy : y;
      const nz = z + dz;
      if (
        nx >= 0 &&
        nx < blocks.length &&
        ny >= 0 &&
        ny < blocks[nx].length &&
        nz >= 0 &&
        nz < blocks[nx][ny].length
      ) {
        if (blocks[nx][ny][nz] === type) {
          return true;
        }
      }
    }
    return false;
  };

  proceduralGenerate() {
    //debugger;
    const terrain = [];
    const focus = 20;
    //const maxHeight = this.size / 2; // Ajusta a altura máxima do terreno
    const maxHeight = 20; // Ajusta a altura máxima do terreno

    for (let x = 0; x < this.size; x++) {
      terrain[x] = [];
      for (let y = 0; y < this.size; y++) {
        terrain[x][y] = [];
        for (let z = 0; z < this.size; z++) {
          var gx, gy, gz;
          gx = this.globalPosition.x + x;
          gy = this.globalPosition.y + y;
          gz = this.globalPosition.z + z;

          //const noise3D = this.noise.perlin3(x / focus, y / focus, z / focus);
          const noise3D = this.noise.perlin3(
            gx / focus,
            gy / focus,
            gz / focus
          );

          const scaledHeight = Math.floor(((noise3D + 1) * maxHeight) / 2);
          let type = 0;
          if (y < scaledHeight) {
            if (y < scaledHeight * 0.2) type = 4; // Pedra profunda
            else if (y < scaledHeight * 0.5) type = 3; // Pedra
            else if (y < scaledHeight * 0.8) type = 2; // Terra
            else type = 1; // Grama
          }

          terrain[x][y][z] = type;
        }
      }
    }
    return terrain;
  }
}
