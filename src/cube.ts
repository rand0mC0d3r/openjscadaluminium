import { Color3, StandardMaterial } from "@babylonjs/core";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

export const createCube = (scene: Scene, size = 2, color = [1, 0, 0]) => {
  const cube = MeshBuilder.CreateBox("cube", { size }, scene);
  const material = new StandardMaterial("cubeMaterial", scene);
  material.diffuseColor = new Color3(...color); // RGB values between 0 and 1
  cube.material = material;
  return cube;
};
