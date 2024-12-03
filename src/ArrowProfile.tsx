import { Color3, Mesh, MeshBuilder, StandardMaterial } from "@babylonjs/core";
import React, { useEffect } from "react";
import { useScene } from "./SceneContext";

interface ArrowProfileProps {
  width: number; // Thickness of the middle line
  length: number; // Total height of the arrow
  sideWidth: number; // Width of each angled board
  color: [number, number, number]; // RGB color of the arrow
}

const ArrowProfile: React.FC<ArrowProfileProps> = ({
  width,
  length,
  sideWidth,
  color,
}) => {
  const { scene } = useScene();

  useEffect(() => {
    if (!scene) return;

    const material = new StandardMaterial("arrowMaterial", scene);
    material.diffuseColor = new Color3(...color);

    // Create the middle vertical line
    const middleLine = MeshBuilder.CreateBox(
      "middleLine",
      { width, height: length, depth: width },
      scene
    );
    middleLine.material = material;

    // Create the left angled board
    const leftBoard = MeshBuilder.CreateBox(
      "leftBoard",
      { width: sideWidth, height: length, depth: sideWidth },
      scene
    );
    leftBoard.rotation.z = Math.PI / 4; // 45° angle
    leftBoard.position.x = -width / 2 - sideWidth / Math.sqrt(2);
    leftBoard.material = material;

    // Create the right angled board
    const rightBoard = MeshBuilder.CreateBox(
      "rightBoard",
      { width: sideWidth, height: length, depth: sideWidth },
      scene
    );
    rightBoard.rotation.z = -Math.PI / 4; // -45° angle
    rightBoard.position.x = width / 2 + sideWidth / Math.sqrt(2);
    rightBoard.material = material;

    // Merge the meshes into one
    const arrow = Mesh.MergeMeshes([middleLine, leftBoard, rightBoard], true, false, undefined, false, true);

    if (arrow) {
      arrow.name = "arrowProfile";
      arrow.material = material;
    }

    return () => {
      arrow?.dispose();
    };
  }, [scene, width, length, sideWidth, color]);

  return null;
};

export default ArrowProfile;
