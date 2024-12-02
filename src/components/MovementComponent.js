import Component from "../core/Component.js";
export default class MovementComponent extends Component {
  constructor(velocity = { x: 0, y: 0, z: 0 }) {
    super();
    this.velocity = velocity;
  }
}
