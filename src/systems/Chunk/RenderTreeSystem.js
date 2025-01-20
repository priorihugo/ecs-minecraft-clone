import { colorMap } from "../../constants/maps/maps";
import System from "../../core/System";

export class RenderTreeSystem extends System {
  /**
   *
   */
  constructor() {
    super();

    this.TJSTreesModel = [];
    this.loadTreesAsync();
    this.canRenderTree = false;
  }

  normalizeTree = (blockArray) => {
    const root = blockArray.reduce((smallY, currentBlock) =>
      currentBlock.y < smallY ? currentBlock.y : smallY
    );

    var shiftX = -root.position.x;
    var shiftZ = -root.position.z;

    blockArray = blockArray.map((block) => {
      block.position.x += shiftX;
      block.position.z += shiftZ;

      return block;
    });

    return blockArray;
  };

  loadTreesAsync = () => {
    var classScope = this;
    async function loadJson() {
      try {
        const response = await fetch("./trees/index.json");
        if (!response.ok) throw new Error("Erro ao carregar index.json");

        const files = await response.json();
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        for (const file of files) {
          try {
            const fileResponse = await fetch("/exercises/T1/trees/" + file);
            if (!fileResponse.ok) throw new Error(`Erro ao carregar ${file}`);

            const data = await fileResponse.json();
            //console.log(`Conteúdo de ${file}:`, data);
            var normalized = classScope.normalizeTree(data);
            var tree = new THREE.Group();

            normalized.forEach((block) => {
              //const material = setDefaultMaterial(color);
              const material = new THREE.MeshBasicMaterial({
                color: colorMap[block.type ?? 1]
              });

              const cube = new THREE.Mesh(geometry, material);
              const { x, y, z } = block.position;

              cube.position.set(x + 0.5, y + 0.5, z + 0.5);
              tree.add(cube);
            });

            //debugger;

            classScope.TJSTreesModel.push(tree);
          } catch (error) {
            console.error(`Erro ao processar o arquivo ${file}:`, error);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar os arquivos:", error);
      }

      classScope.canRenderTree = true;
    }
    loadJson();
  };

  renderTrees = (blocks) => {
    //verifica se tem campos de arvore marcados no mapa
    const treeGroup = [];
    for (let x = 0; x < blocks.length; x++) {
      for (let y = 0; y < blocks[x].length; y++) {
        for (let z = 0; z < blocks[x][y].length; z++) {
          const type = blocks[x][y][z];

          if (type == 9) {
            //existe um grupo para esta posição?
            //treeGroup = grupos de pontos[ grupo de pontos [pontos{}{}{}{}] , [{}{}{}{}]]
            //cada grupo dentro do array deve ser a base 2x2 da arvore
            var groupIndex = treeGroup.findIndex((group) => {
              const isNeighbor = (p1, p2) => {
                const dx = Math.abs(p1.x - p2.x);
                const dy = Math.abs(p1.z - p2.z);

                return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
              };
              var r = group.some((coord) => {
                return isNeighbor(coord, { x, z });
              });
              return r;
            });
            //não encontrado => cria novo grupo
            if (groupIndex === -1) {
              var g = [];
              g.push({ x: x, y: y, z: z });
              treeGroup.push(g);
            } else {
              var g = treeGroup[groupIndex];
              g.push({ x: x, y: y, z: z });
            }
          }
        }
      }
    }

    treeGroup.forEach((group) => {
      const getCenter = (group) => {
        var sumX = 0,
          sumY = 0,
          sumZ = 0,
          numPoints = 0;
        group.forEach((point) => {
          sumX += point.x;
          sumY += point.y;
          sumZ += point.z;
        });
        numPoints = group.length;

        return {
          x: sumX / numPoints,
          y: sumY / numPoints,
          z: sumZ / numPoints
        };
      };
      var { x, y, z } = getCenter(group);
      const t = this.treesModel[0].clone(true);

      t.position.set(x, y, z);
      this.scene.add(t);
    });
  };
}
