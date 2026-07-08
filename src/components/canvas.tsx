import { TOOLS } from "@/constants/toolBar";
import { useStore } from "@/context/StateContext";
import { useEffect, useRef, useState } from "react";
import type { keyType } from "./toolBar";

function useCanvas(ref: React.RefObject<HTMLCanvasElement | null>) {
  const { setCanvas } = useStore();

  useEffect(() => {
    if (ref.current !== null) {
      const obj = ref.current.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;
      ref.current.width = width * dpr;
      ref.current.height = height * dpr;

      if (obj !== null) {
        obj.scale(dpr, dpr);
        obj.imageSmoothingEnabled = false;
      }

      if (obj) {
        setCanvas(obj);
      }
    }
  }, []);
}

export type SHAPE = {
  id: number;
  type: string;
  strokeStyle: string;
  x: number;
  y: number;
};

const draw = ({
  canvas,
  cords,
  current,
  drawing,
}: {
  canvas: CanvasRenderingContext2D;
  cords: SHAPE[][];
  current: SHAPE;
  drawing: boolean;
}) => {
  canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

  for (const cord of cords) {
    TOOLS[cord[0].type as keyType].draw({
      canvas,
      cord,
      current,
      drawing,
      ratio: 0.6,
    });
  }
};

export default function Canvas() {
  const [shape, setShapes] = useState<SHAPE[][]>([]);
  const [current, setCurrent] = useState<SHAPE | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [move, setMove] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [count, setCount] = useState(0);

  useCanvas(canvasRef);

  const { hotKey, setCords, getCanvas, color, setHotKey } = useStore();
  const storeCords = (shape: SHAPE[][]) => {
    const canvas = getCanvas();
    setCords(shape);

    if (canvas && shape && hotKey && current) {
      draw({ canvas, cords: shape, current, drawing });
    }
  };

  const handleShapeChange = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (hotKey) {
      const newShape = {
        id: count,
        type: hotKey ? hotKey : "",
        strokeStyle: color,
        x: event.clientX,
        y: event.clientY,
      };
      const data: SHAPE[][] = [...shape];

      if (event.type === "mousedown") {
        setMove(true);
        if (data?.length === 0 || data[data.length - 1]?.length >= 2) {
          data.push([newShape]);
          setShapes(data);
          if (hotKey === "P") setDrawing(true);
        }
      } else if (event.type === "mousemove" && move) {
        if (!drawing && shape[shape.length - 1].length < 2) {
          setCurrent(newShape);
        } else {
          const last = shape[shape.length - 1];
          const isContinous = last[0].id === count;
          if (isContinous) {
            const lastData = [...last, newShape];
            data.push([...lastData]);
            setShapes(data);
            const canvas = getCanvas();
            // console.log("test", canvas, current);
            if (canvas) {
              TOOLS[hotKey as keyType].draw({
                canvas,
                cord:lastData,
                current:newShape,
                drawing,
                ratio: 0.6,
              });
            }
          }
        }
      } else if (event.type === "mouseup") {
        setDrawing(false);
        data[data.length - 1].push(newShape);
        setShapes(data);
        setCount((prev) => ++prev);
        setCurrent(null);
        setHotKey(null);
        setMove(false);
      } else if (event.type === "mouseleave") {
        setDrawing(false);
      }
    }
  };

  useEffect(() => {
    if (shape && hotKey && current) {
      storeCords(shape);
    }
  }, [current, shape]);

  return (
    <canvas
      onMouseDown={handleShapeChange}
      onMouseMove={handleShapeChange}
      onMouseUp={handleShapeChange}
      onMouseLeave={handleShapeChange}
      className="h-screen w-screen bg-gray-300 cursor-pointer"
      ref={canvasRef}
    />
  );
}
