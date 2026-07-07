import type { SHAPE } from "@/components/canvas";

export const TOOLS = {
  R: {
    label: "Rectangle",
    hotkey: "R",
    draw: ({
      canvas,
      cord,
      current,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
    }) => {
      if (cord !== null && cord.length <= 2) {
        const end = cord[1] || current;
        const width = end.x - cord[0].x;
        const height = end.y - cord[0].y;
        canvas.strokeStyle = end.strokeStyle;
        canvas.strokeRect(cord[0].x, cord[0].y, width, height);
      }
    },
  },
  D: {
    label: "Diamond",
    hotkey: "D",
    draw: ({
      canvas,
      cord,
      current,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
    }) => {
      if (cord !== null && cord.length <= 2) {
        const end = cord[1] || current;
        const width = end.x - cord[0].x;
        const height = end.y - cord[0].y;
        canvas.strokeStyle = end.strokeStyle;
        canvas.strokeRect(cord[0].x, cord[0].y, width, height);
      }
    },
  },
  C: {
    label: "Circle",
    hotkey: "C",
    draw: ({
      canvas,
      cord,
      current,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
    }) => {
      console.log("circle");
    },
  },
  A: {
    label: "Arrow",
    hotkey: "A",
    draw: ({
      canvas,
      cord,
      current,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
    }) => {
      console.log("arrow");
    },
  },
  L: {
    label: "Line",
    hotkey: "L",
    draw: ({
      canvas,
      cord,
      current,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
    }) => {
      console.log("line");
    },
  },
  T: {
    label: "Text",
    hotkey: "T",
    draw: ({
      canvas,
      cord,
      current,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
    }) => {
      console.log("text");
    },
  },
};
