import "./App.css";
import Canvas from "./components/canvas";
import ToolBar from "./components/toolBar";
import { Store } from "./context/StateContext";

function App() {
  return (
    <>
      <Store>
        <ToolBar />
        <Canvas />
      </Store>
    </>
  );
}

export default App;
