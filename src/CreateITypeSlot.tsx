import { Color3, StandardMaterial } from "@babylonjs/core";
import { CSG } from "@babylonjs/core/Meshes/csg";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import React, { useEffect } from "react";
import { useScene } from "./SceneContext";

interface CreateITypeSlotProps {
  length: number; // Length of the profile
  baseWidth: number; // Width of the central block
  slotWidth: number; // Width of the outer rail slots
  wallThickness: number; // Thickness of the block and rail walls
  railHeight: number; // Height of the rails
  color: [number, number, number]; // RGB color for the profile
}

const CreateITypeSlot: React.FC<CreateITypeSlotProps> = ({
  length,
  baseWidth,
  slotWidth,
  wallThickness,
  railHeight,
  color,
}) => {
  const { scene } = useScene();

  useEffect(() => {
    if (!scene) return;

    // Step 1: Create the base block
    const baseBlock = MeshBuilder.CreateBox(
      "baseBlock",
      { height: length, width: baseWidth, depth: baseWidth },
      scene
    );

    // Step 2: Hollow out the cylindrical core
    const cylinder = MeshBuilder.CreateCylinder(
      "cylinder",
      {
        diameter: baseWidth - wallThickness * 2,
        height: length + 0.1,
      },
      scene
    );

    // // Step 3: Create outer rail slots
    // const railSlot = MeshBuilder.CreateBox(
    //   "railSlot",
    //   { height: length + 0.1, width: slotWidth, depth: railHeight },
    //   scene
    // );

    // Position railSlot for subtraction
    // const railPositions = [
    //   [baseWidth / 2 - railHeight / 2, 0, 0], // Right
    //   [-baseWidth / 2 + railHeight / 2, 0, 0], // Left
    //   [0, baseWidth / 2 - railHeight / 2, 0], // Top
    //   [0, -baseWidth / 2 + railHeight / 2, 0], // Bottom
    // ];

    // const railSlotsCSG = railPositions.map(([x, y, z]) => {
    //   const railClone = railSlot.clone();
    //   railClone.position.set(x, y, z);
    //   return CSG.FromMesh(railClone);
    // });

    // Perform CSG Operations
    const baseCSG = CSG.FromMesh(baseBlock);
    const cylinderCSG = CSG.FromMesh(cylinder);

    // Subtract central core and rail slots
    const finalCSG = baseCSG.subtract(cylinderCSG);
    // railSlotsCSG.forEach((slotCSG) => {
    //   finalCSG = finalCSG.subtract(slotCSG);
    // });

    const finalMesh = finalCSG.toMesh("ITypeSlot", null, scene);

    // Apply material
    const material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(...color);
    finalMesh.material = material;

    // Dispose intermediate meshes
    baseBlock.dispose();
    cylinder.dispose();
    // railSlot.dispose();

    return () => {
      finalMesh.dispose();
    };
  }, [scene, length, baseWidth, slotWidth, wallThickness, railHeight, color]);

  return null;
};

export default CreateITypeSlot;
