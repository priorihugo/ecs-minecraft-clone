import TransformComponent from '../components/TransformComponent.js';
import MovementComponent from './../components/MovementComponent.js';

import System from '../core/System.js';

export default class MovementSystem extends System {
  update(entities, dt) {
    entities.forEach(entity => {
      
      const transform = entity.getComponent(TransformComponent);
      const movement = entity.getComponent(MovementComponent);

      //debugger;

      if (transform && movement) {

        transform.position.x += movement.velocity.x * dt;
        transform.position.y += movement.velocity.y * dt;
        transform.position.z += movement.velocity.z * dt;
        
        entity.setPosition(transform);
      }
    });
  }
}
