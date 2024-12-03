import AluminumStrut from './AluminiumStrut';
import './App.css';
import ArrowProfile from './ArrowProfile';
import CreateHollowCube from './CreateHollowCube';
import CreateITypeSlot from './CreateITypeSlot';
import RenderScene from './RenderScene';

function App() {

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '20px'}}>
    <RenderScene>
      {/* <CreateHollowCube size={2} hollowSize={1.1} color={[1, 0, 0]} /> */}
      {/* <AluminumStrut length={10} outerDiameter={2} wallThickness={0.2} railWidth={0.4} railDepth={0.2} railCount={4} color={[0.8, 0.8, 0.8]} /> */}
      <ArrowProfile
  width={2}
  length={20}
  sideWidth={2}
  color={[1, 0, 0]} // Red arrow
/>
{/* <CreateITypeSlot
  length={100}
  baseWidth={20}
  slotWidth={5}
  wallThickness={1}
  railHeight={6}
  color={[0.7, 0.7, 0.7]}
/> */}
    </RenderScene>
    </div>
  )
}

export default App
