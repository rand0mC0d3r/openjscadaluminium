import './App.css';
import CreateHollowCube from './CreateHollowCube';
import RenderScene from './RenderScene';

function App() {

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '20px'}}>
    <RenderScene>
      <CreateHollowCube size={2} hollowSize={1.1} color={[1, 0, 0]} />
    </RenderScene>
    </div>
  )
}

export default App
