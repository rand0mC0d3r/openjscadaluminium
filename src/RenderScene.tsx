import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import React, { useEffect, useRef } from "react";
import { createCube } from "./cube";

const RenderScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create Babylon.js engine
    const engine = new Engine(canvas, true);

    // Create scene
    const scene = new Scene(engine);

    // Add a camera
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 4,
      Math.PI / 4,
      10,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    // Add a light
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Create and add the cube
    createCube(scene, 2, [1, 0, 0]); // Red cube of size 2

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize handler
    window.addEventListener("resize", () => engine.resize());

    // Cleanup
    return () => {
      engine.dispose();
      window.removeEventListener("resize", () => engine.resize());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
};

export default RenderScene;
