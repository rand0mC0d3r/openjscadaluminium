import { Engine, Scene } from '@babylonjs/core';
import { ReactNode, createContext, useContext } from 'react';

interface SceneContextProps {
  engine: Engine | null;
  scene: Scene | null;
}

const SceneContext = createContext<SceneContextProps>({ engine: null, scene: null });

export const useScene = () => useContext(SceneContext);

export const SceneProvider = ({
  engine,
  scene,
  children
} : {
  engine: Engine | null;
  scene: Scene | null;
  children: ReactNode;
}) => {
  return (
    <SceneContext.Provider value={{ engine, scene }}>
      {children}
    </SceneContext.Provider>
  );
};
