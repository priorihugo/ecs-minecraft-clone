import * as THREE from "/build/three.module.js";
import Scene from "/src/core/Scene.js";
import ChunkEntity from "/src/entities/blocos/ChunkEntity.js";

import OrbitalCameraEntity from "/src/entities/Cameras/OrbitalCameraEntity.js";
import FirstPersonCameraEntity from "/src/entities/Cameras/FirstPersonCameraEntity.js";

import RenderChunkSystem from "/src/systems/Chunk/RenderChunkSystem.js";
import RenderSystem from "/src/systems/RenderSystem.js";
import KeyboardInputSystem from "/src/systems/KeyboardInputSystem.js";
import MovementSystem from "/src/systems/MovementSystem.js";
import GUI from "/src/libs/util/dat.gui.module.js";

import {
  initRenderer,
  initDefaultBasicLight,
  setDefaultMaterial,
  onWindowResize,
  createGroundPlaneXZ,
  createGroundPlaneWired,
  InfoBox
} from "/src/libs/util/util.js";
import {
  awsdMovement,
  builderSceneCommands
} from "/src/constants/maps/controls.js";
import { colorMap } from "../constants/maps/maps.js";
import VoxelEntity from "../entities/blocos/VoxelEntity.js";

export default class BuilderScene extends Scene {
  constructor() {
    super("Builder");

    this.scene = new THREE.Scene();
    this.renderer = initRenderer();
    this.light = initDefaultBasicLight(this.scene);

    this.fpCamera = new FirstPersonCameraEntity(this.renderer);
    this.orbitalCamera = new OrbitalCameraEntity(this.renderer);
    this.isInspectionMode = false;

    this.cameras.push(this.orbitalCamera);
    this.cameras.push(this.fpCamera);
    this.activeCamera = this.orbitalCamera;
    this.inventoryState = {
      currentVoxelType: 1
    };

    this.initialize();
  }

  initialize() {
    this.height = 10;
    this.width = 10;
    console.log("Construindo ambiente...");

    // Constroi o plano
    this.plane = createGroundPlaneXZ(this.width, this.height);
    this.plane.material.opacity = 0.2;
    this.plane.material.transparent = true;
    this.scene.add(this.plane);

    //Constroi o plano quadriculado
    this.gridHelper = new THREE.GridHelper(this.height, this.width);
    // Alinha o grid no plano XZ
    this.gridHelper.rotation.x = Math.PI / 2;
    this.plane.add(this.gridHelper);

    // Cria o cubo wireframe
    let wireframeGeometry = new THREE.BoxGeometry(1, 1, 1);
    let wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    this.wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(wireframeGeometry),
      wireframeMaterial
    );

    this.wireframe.position.set(0.5, 0.5, 0.5); // Altura padrão inicial
    this.scene.add(this.wireframe);

    this.addGUI();

    this.addEntity(this.fpCamera);
    this.addEntity(this.orbitalCamera);

    this.addSystem(
      new KeyboardInputSystem(this, awsdMovement, builderSceneCommands)
    );
  }

  toggleCamera() {
    if (this.isInspectionMode) {
      this.activeCamera = this.fpCamera;
      this.isInspectionMode = false;
      console.log("Modo: Primeira Pessoa");
    } else {
      // Alterna para câmera de inspeção
      this.activeCamera = this.orbitalCamera;
      this.isInspectionMode = true;
      console.log("Modo: Inspeção");
    }
  }

  update(dt) {
    // let axesHelper = new THREE.AxesHelper(12);
    // let plane = createGroundPlaneXZ(70, 70);
    //this.scene.clear();

    this.plane.add(this.gridHelper);
    this.scene.add(this.plane);
    this.scene.add(this.wireframe);

    super.update(dt);
    this.renderer.render(this.scene, this.activeCamera.camera);
  }

  getWireframe() {
    return this.wireframe;
  }

  getActiveCamera() {
    return this.activeCamera;
  }

  addHeightIndicator(x, y, z) {
    // Procura um indicador existente na posição
    let indicatorName = `indicator-${x}-${y}-${z}`;
    let existingIndicator = this.plane.getObjectByName(indicatorName);

    if (!existingIndicator) {
      // Cria uma linha pontilhada para indicar a altura
      let material = new THREE.LineDashedMaterial({
        color: 0x0000ff,
        dashSize: 0.2,
        gapSize: 0.01
      });
      const points = [
        new THREE.Vector3(x, 0, z), // Base no plano
        new THREE.Vector3(x, y, z) // Ponto final no nível 1
      ];
      let geometry = new THREE.BufferGeometry().setFromPoints(points);
      let line = new THREE.Line(geometry, material);
      line.computeLineDistances(); // Necessário para linhas pontilhadas
      line.name = indicatorName;

      this.scene.add(line);
    }
  }

  removeHeightIndicator(x, y, z) {
    let indicatorName = `indicator-${x}-${y}-${z}`;
    let indicator = scene.getObjectByName(indicatorName);
    if (indicator) {
      scene.remove(indicator);
    }
  }

  addGUI() {
    var controls = {
      filename: "",
      save: () => {
        this.saveFile(controls.filename);
      },
      load: () => {
        this.loadFile();
      }
    };

    let gui = new GUI();
    gui.add(controls, "filename").name("Insira o nome");
    gui.add(controls, "save").name("Salvar Arquivo");
    gui.add(controls, "load").name("Carregar Arquivo");
  }

  nextVoxelType() {
    const typeLength = Object.keys(colorMap).length;
    this.inventoryState.currentVoxelType += 1;
    if (this.inventoryState.currentVoxelType > typeLength) {
      this.inventoryState.currentVoxelType = 1;
    }
    console.log(
      this.inventoryState.currentVoxelType,
      colorMap[this.inventoryState.currentVoxelType]
    );
  }

  previousVoxelType() {
    const typeLength = Object.keys(colorMap).length;
    this.inventoryState.currentVoxelType -= 1;
    if (this.inventoryState.currentVoxelType < 1)
      this.inventoryState.currentVoxelType = typeLength;

    console.log(
      this.inventoryState.currentVoxelType,
      colorMap[this.inventoryState.currentVoxelType]
    );
  }

  addVoxel() {
    //debugger;
    const { x, y, z } = this.getWireframe().position;
    if (this.scene.getObjectByName(`voxel-${x}-${y}-${z}`)) return;
    //const color = voxelColor ?? colorMap[this.inventoryState.currentVoxelType];
    // const voxelGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const voxelMaterial = setDefaultMaterial(color);
    // const voxel = new THREE.Mesh(voxelGeometry, voxelMaterial);
    const voxel = new VoxelEntity().build(
      { x: x - 0.5, y: y - 0.5, z: z - 0.5 },
      this.inventoryState.currentVoxelType
    );

    //voxel.position.set(x, y, z);
    voxel.name = `voxel-${x}-${y}-${z}`; // Nome único baseado na posição
    voxel.type = this.inventoryState.currentVoxelType;
    this.scene.add(voxel);
  }

  removeVoxel() {
    const { x, y, z } = this.getWireframe().position;
    const voxelName = `voxel-${x}-${y}-${z}`;
    const voxel = this.scene.getObjectByName(voxelName);
    if (voxel) {
      this.scene.remove(voxel);
    }
  }

  saveFile(filename) {
    const data = scene.children
      .filter((voxel) => voxel.name && voxel.name.startsWith("voxel-"))
      .map((voxel) => {
        return {
          position: voxel.position,
          color: voxel.material.color.getHex()
        };
      });

    const file = new Blob([JSON.stringify(data)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = `${filename.split(".")[0]}.json`;
    link.click();
  }

  loadFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json"; // Aceita apenas arquivos JSON
    input.onchange = (event) => {
      const file = event.target.files[0]; // Pega o arquivo selecionado
      if (file) {
        console.log(file);
        if (file.type !== "application/json") return;
        const reader = new FileReader();
        reader.onload = (e) => {
          JSON.parse(e.target.result).map((voxel) => {
            voxel &&
              this.addVoxel(
                voxel.position.x,
                voxel.position.y,
                voxel.position.z,
                voxel.color
              );
            this.addHeightIndicator(
              voxel.position.x,
              voxel.position.y,
              voxel.position.z
            );
          });
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }
}
