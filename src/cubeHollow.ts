import { Color3, StandardMaterial } from "@babylonjs/core";
import { CSG } from "@babylonjs/core/Meshes/csg";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

export const createHollowCube = (scene: Scene, cubeSize = 2, sphereRadius = 1, color = [1, 0, 0]) => {
  // Create the cube
  const cube = MeshBuilder.CreateBox("cube", { size: cubeSize }, scene);
  const cubeMaterial = new StandardMaterial("cubeMaterial", scene);
  cubeMaterial.diffuseColor = new Color3(...color);
  cube.material = cubeMaterial;

  // Create the sphere
  const sphere = MeshBuilder.CreateSphere("sphere", { diameter: sphereRadius * 2 }, scene);

  // Position the sphere (optional: center it within the cube)
  sphere.position = cube.position.clone();

  // Perform CSG subtraction
  const cubeCSG = CSG.FromMesh(cube);
  const sphereCSG = CSG.FromMesh(sphere);
  const hollowCubeCSG = cubeCSG.subtract(sphereCSG);

  // Convert the result back to a mesh
  const hollowCube = hollowCubeCSG.toMesh("hollowCube", cubeMaterial, scene);

  // Dispose of the original meshes
  cube.dispose();
  sphere.dispose();

  return hollowCube;
};
