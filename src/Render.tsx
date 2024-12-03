import { stlSerializer } from '@jscad/io';
import { transforms } from '@jscad/modeling';
import { union } from '@jscad/modeling/src/operations/booleans';
import { roundedCuboid } from '@jscad/modeling/src/primitives';
import { setupRenderer } from '@jscad/web';
import { useEffect, useRef } from 'react';

const Render = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (!context) return;

      const create3DGeometry = () => {
        const cuboid = roundedCuboid({
          size: [10, 20, 5],
          segments: 16,
        });
        // const shiftedCuboid = transforms.translate([15, 0, 0], cuboid);
        // return union(cuboid, shiftedCuboid);
        return cuboid;
      };

      const geometry = create3DGeometry();
      console.log(geometry)
      const serializedData = stlSerializer.serialize({ binary: false }, geometry);

      // Display or process serializedData as needed
      console.log(serializedData); // Logs the serialized STL data
      // setupRenderer({ viewerElement: '#viewer' }, [geometry]);

      // Rendering can be integrated here using @jscad/web or a custom renderer
    }
  }, []);

  return <>
  <div id="viewer"></div>
    <canvas ref={canvasRef} width="500" height="500" />
  </>
};

export default Render;
