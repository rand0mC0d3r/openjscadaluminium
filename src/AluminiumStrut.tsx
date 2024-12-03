import { Color3, StandardMaterial } from "@babylonjs/core";
import { CSG } from "@babylonjs/core/Meshes/csg";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import React, { useEffect } from "react";
import { useScene } from "./SceneContext";

interface CreateAluminumStrutProps {
  length: number; // Length of the strut
  outerDiameter: number; // Outer diameter of the pipe
  wallThickness: number; // Thickness of the pipe walls
  railWidth: number; // Width of the rail slots
  railDepth: number; // Depth of the rail slots
  railCount: number; // Number of rail slots around the strut
  color: [number, number, number]; // RGB color for the strut
}

const CreateAluminumStrut: React.FC<CreateAluminumStrutProps> = ({
  length,
  outerDiameter,
  wallThickness,
  railWidth,
  railDepth,
  railCount,
  color,
}) => {
  const { scene } = useScene();

  useEffect(() => {
    if (!scene) return;

    // Create the outer pipe
    const outerPipe = MeshBuilder.CreateCylinder(
      "outerPipe",
      { height: length, diameter: outerDiameter, tessellation: 64 },
      scene
    );

    // Hollow out the inner pipe
    const innerPipe = MeshBuilder.CreateCylinder(
      "innerPipe",
      { height: length + 0.1, diameter: outerDiameter - wallThickness * 2, tessellation: 64 },
      scene
    );

    // Create a single rail slot
    const railSlot = MeshBuilder.CreateBox(
      "railSlot",
      { height: length + 0.1, width: railWidth, depth: railDepth },
      scene
    );

    // Position and rotate rail slots around the strut
    const slots = [];
    for (let i = 0; i < railCount; i++) {
      const slot = railSlot.clone(`slot_${i}`);
      const angle = (Math.PI * 2 * i) / railCount;
      const x = (outerDiameter / 2 - railDepth / 2) * Math.cos(angle);
      const z = (outerDiameter / 2 - railDepth / 2) * Math.sin(angle);
      slot.position.set(x, 0, z);
      slot.rotation.y = -angle;
      slots.push(slot);
    }

    // Use CSG to subtract inner pipe and rail slots from the outer pipe
    const outerCSG = CSG.FromMesh(outerPipe);
    const innerCSG = CSG.FromMesh(innerPipe);
    const railCSGs = slots.map(slot => CSG.FromMesh(slot));

    let strutCSG = outerCSG.subtract(innerCSG);
    railCSGs.forEach(railCSG => {
      strutCSG = strutCSG.subtract(railCSG);
    });

    // Convert the CSG result back to a mesh
    const strutMesh = strutCSG.toMesh("aluminumStrut", null, scene);

    // Apply material
    const strutMaterial = new StandardMaterial("strutMaterial", scene);
    strutMaterial.diffuseColor = new Color3(...color);
    strutMesh.material = strutMaterial;

    // Clean up intermediate meshes
    outerPipe.dispose();
    innerPipe.dispose();
    railSlot.dispose();
    slots.forEach(slot => slot.dispose());

    return () => {
      strutMesh.dispose();
    };
  }, [scene, length, outerDiameter, wallThickness, railWidth, railDepth, railCount, color]);

  return null;
};

export default CreateAluminumStrut;
