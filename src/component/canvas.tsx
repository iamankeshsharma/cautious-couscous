import { useRef } from "react";

export default function Canvas(){
    const canvasRef = useRef(null);
    return <canvas ref={canvasRef} style={{
        height:"100vh",
        width: "100vw",
        backgroundColor: "#dddddd"
    }}/>;
}