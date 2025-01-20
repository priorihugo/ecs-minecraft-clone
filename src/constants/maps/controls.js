export const awsdMovement = {
  x: "moveUp",
  z: "moveDown",
  a: "moveLeft",
  d: "moveRight",
  w: "moveForward",
  s: "moveBackward"
};

export const cameraMovement = {
  c: "toggleCamera",
  C: "toggleCamera",
  arrowLeft: "moveCameraLeft",
  arrowRight: "moveCameraRight",
  pageDown: "moveCameraUp",
  pageUp: "moveCameraDown",
  left: "moveCameraLeft",
  right: "moveCameraRight",
  up: "moveCameraForward",
  down: "moveCameraBackward"
};

export const builderSceneCommands = {
  arrowUp: "moveBlockForward",
  up: "moveBlockForward",

  arrowDown: "moveBlockBackward",
  down: "moveBlockBackward",

  arrowLeft: "moveBlockLeft",
  left: "moveBlockLeft",

  arrowRight: "moveBlockRight",
  right: "moveBlockRight",

  pageUp: "moveBlockUp",
  pageDown: "moveBlockDown",

  ".": "nextVoxelType",
  ",": "previousVoxelType",

  q: "addVoxel",
  Q: "addVoxel",

  e: "removeVoxel",
  E: "removeVoxel",

  c: "toggleCamera",
  C: "toggleCamera"
};
