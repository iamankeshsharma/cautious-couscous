import './App.css'
import {useRef} from 'react';

function App() {
  const canvasRef = useRef(null);

  return (
    <>
      <canvas ref={canvasRef}/>
    </>
  )
}

export default App
