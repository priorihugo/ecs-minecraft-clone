import Engine from "./core/Engine.js";
import BuilderScene from "./scenes/BuilderScene.js";
import MainScene from "./scenes/MainScene.js";

const engine = new Engine();
engine.changeScene(new MainScene());
//engine.changeScene(new BuilderScene());

// Loop principal
let lastTime = performance.now();

function animate(currentTime) {
  const dt = currentTime - lastTime;
  lastTime = currentTime;

  engine.update(dt);
  requestAnimationFrame(animate);
}

animate(lastTime);
