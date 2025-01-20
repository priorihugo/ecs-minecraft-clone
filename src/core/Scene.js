//Uma cena é uma coleção de sistemas e entidades
//isto é, uma cena precisa gerir os objetos em cena e os sistemas responsaveis por sua atualização
export default class Scene {
  constructor(name) {
    this.name = name;
    this.entities = [];
    this.systems = [];

    this.cameras = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  addSystem(system) {
    this.systems.push(system);
  }

  update(dt) {
    this.systems.forEach((system) => system.update(this.entities, dt));
  }
}
