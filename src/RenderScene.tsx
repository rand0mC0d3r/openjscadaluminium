/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArcRotateCamera, Engine, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';
import { useEffect, useRef, useState } from 'react';
import { SceneProvider } from './SceneContext';

const RenderScene = ({ children }: { children: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<Engine | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const engineInstance = new Engine(canvas, true);
    const sceneInstance = new Scene(engineInstance);

    // Add a camera
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 4,
      Math.PI / 4,
      10,
      Vector3.Zero(),
      sceneInstance
    );
    camera.attachControl(canvas, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), sceneInstance);

    engineInstance.runRenderLoop(() => {
      sceneInstance.render();
    });

    window.addEventListener("resize", () => engineInstance.resize());

    setEngine(engineInstance);
    setScene(sceneInstance);

    return () => {
      engineInstance.dispose();
      window.removeEventListener("resize", () => engineInstance.resize());
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {engine && scene && (
        <SceneProvider engine={engine} scene={scene}>
          {children}
        </SceneProvider>
      )}
    </div>
  );
};

export default RenderScene;
