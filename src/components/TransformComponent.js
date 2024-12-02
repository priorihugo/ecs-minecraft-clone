import * as THREE from '/build/three.module.js';
import Component from '../core/Component.js';

export default class TransformComponent extends Component {
  constructor({x = 0, y = 0, z = 0}) {
    super();
    this.position = new THREE.Vector3( x, y, z );
    this.rotation = null;
    this.scale = null;
  }
}
