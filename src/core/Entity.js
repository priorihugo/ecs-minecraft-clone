
//uma entidade é uma coleção de componentes
//cada componente determina uma caracteristica de uma entidade
export default class Entity {
    constructor(name) {
      this.name = name;
      this.components = new Map();
    }
  
    addComponent(component) {
      this.components.set(component.constructor.name, component);
    }
  
    getComponent(componentClass) {
      return this.components.get(componentClass.name);
    }

    setPosition(){
      
    }
  }
  