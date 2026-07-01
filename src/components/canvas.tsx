import { useStore } from "@/context/StateContext";
import { useEffect, useRef, useState } from "react";

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
  });
}

export type SHAPE = {
  type: string;
  x: number;
  y: number;
};

export const drawRect = (
  canvas: CanvasRenderingContext2D,
  cords: SHAPE[][],
  current: SHAPE,
) => {
  let last = null;
  if (cords !== null && cords.length >= 2) {
    last = cords[cords.length - 1];
  }
  if (current && last) {
    last[1] = current;

    const width = last[1]?.x - last[0]?.x;
    const height = last[1]?.y - last[0]?.y;
    canvas.strokeRect(last[0].x, last[0].y, width, height);
  }
};

export default function Canvas() {
  const [shape, setShapes] = useState<SHAPE[][]>([]);
  const [move, setMove] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvas(canvasRef);

  const { getCanvas, setCords, setCurrent } = useStore();

  useEffect(() => {
    setCords(shape);
  }, [shape]);

  return (
    <>
      <canvas
        onMouseDown={(event) => {
          setShapes((prev) => [
            ...prev,
            [{ type: "R", x: event.clientX, y: event.clientY }],
          ]);
          setMove(true);
        }}
        onMouseMove={(event) => {
          if (move)
            setCurrent({ type: "R", x: event.clientX, y: event.clientY });
        }}
        onMouseUp={(event) => {
          setMove(false);
          setShapes((prev) => {
            const last = prev[prev.length - 1];
            last[1] = {
              type: "R",
              x: event.clientX,
              y: event.clientY,
            };
            return [...prev, last];
          });
        }}
        className="h-screen w-screen bg-gray-300 cursor-pointer"
        ref={canvasRef}
      />
    </>
  );
}
