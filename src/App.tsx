import "./App.css";
import Canvas from "./components/canvas";
import ToolBar from "./components/toolBar";
import { Store } from "./context/StateContext";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Store>
        <ToolBar />
        <Canvas />
      </Store>
      <Analytics />
    </>
  );
}

export default App;
