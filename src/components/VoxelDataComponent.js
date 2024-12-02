import { y0, y1 } from "../assets/models/matriz.js";
import Component from "../core/Component.js";

export default class VoxelDataComponent extends Component {

  constructor({voxels = [] , size = 16 , voxelBlockMap}) {
    super();
    this.size = size;
    this.voxels = voxels;
    this.voxelBlockDictionary = voxelBlockMap;
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
          if(y == 0)
            blocks[x][y][z] =  3;
          else
          
          if(y == 1)
            blocks[x][y][z] =  y0[z][x];     
          else if(y == 2)
            blocks[x][y][z] = y1[z][x];               
          else
            blocks[x][y][z] = 0;      
        }
      }
    }
    return blocks;
  }
}