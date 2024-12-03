import { Color3, StandardMaterial } from '@babylonjs/core';
import { CSG } from '@babylonjs/core/Meshes/csg';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import React, { useEffect } from 'react';
import { useScene } from './SceneContext';

interface CreateHollowCubeProps {
  size: number;
  hollowSize: number;
  color: [number, number, number];
}

const CreateHollowCube: React.FC<CreateHollowCubeProps> = ({ size, hollowSize, color }) => {
  const { scene } = useScene();

  useEffect(() => {
    if (!scene) return;

    const cube = MeshBuilder.CreateBox("cube", { size }, scene);
    const cubeMaterial = new StandardMaterial("cubeMaterial", scene);
    cubeMaterial.diffuseColor = new Color3(...color);
    cube.material = cubeMaterial;

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: hollowSize * 2 }, scene);

    sphere.position = cube.position.clone();

    const cubeCSG = CSG.FromMesh(cube);
    const sphereCSG = CSG.FromMesh(sphere);
    const hollowCubeCSG = cubeCSG.subtract(sphereCSG);

    const hollowedCube = hollowCubeCSG.toMesh("hollowCube", cubeMaterial, scene);

    cube.dispose();
    sphere.dispose();

    return () => {
      hollowedCube.dispose();
    };
  }, [scene, size, hollowSize, color]);

  return null;
};

export default CreateHollowCube;
