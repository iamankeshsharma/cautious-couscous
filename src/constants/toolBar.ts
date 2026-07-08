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
      drawing: boolean;
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
      ratio = 0.6,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
      drawing: boolean;
      ratio: number;
    }) => {
      if (cord !== null && cord.length <= 2) {
        const right = cord[1] || current;
        const left = cord[0];
        const dx = right.x - left.x;
        const dy = right.y - left.y;

        const width = Math.hypot(dx, dy);
        const height = width * ratio;

        const cx = (left.x + right.x) / 2;
        const cy = (left.y + right.y) / 2;

        // Unit perpendicular vector
        const px = -dy / width;
        const py = dx / width;

        const top = {
          x: cx + (px * height) / 2,
          y: cy + (py * height) / 2,
        };

        const bottom = {
          x: cx - (px * height) / 2,
          y: cy - (py * height) / 2,
        };

        canvas.strokeStyle = right.strokeStyle;
        canvas.beginPath();
        canvas.moveTo(top.x, top.y);
        canvas.lineTo(right.x, right.y);
        canvas.lineTo(bottom.x, bottom.y);
        canvas.lineTo(left.x, left.y);
        canvas.closePath();
        canvas.stroke();
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
      drawing: boolean;
    }) => {
      if (cord !== null && cord.length <= 2) {
        const end = cord[1] || current;
        const radius = Math.floor(
          Math.sqrt(
            Math.pow(end.x - cord[0].x, 2) + Math.pow(end.y - cord[0].y, 2),
          ),
        );
        canvas.strokeStyle = end.strokeStyle;
        canvas.beginPath();
        canvas.arc(cord[0].x, cord[0].y, radius, 0, 2 * Math.PI);
        canvas.lineWidth = 2;
        canvas.stroke();
      }
    },
  },
  A: {
    label: "Arrow",
    hotkey: "A",
    drawArrowHead: function ({
      canvas,
      tip,
      prev,
    }: {
      canvas: CanvasRenderingContext2D;
      tip: SHAPE;
      prev: SHAPE;
    }) {
      const headLength = 12;
      const headAngle = Math.PI / 6; // 30°

      // Direction from previous point to tip
      const angle = Math.atan2(tip.y - prev.y, tip.x - prev.x);

      const leftX = tip.x - headLength * Math.cos(angle - headAngle);
      const leftY = tip.y - headLength * Math.sin(angle - headAngle);

      const rightX = tip.x - headLength * Math.cos(angle + headAngle);
      const rightY = tip.y - headLength * Math.sin(angle + headAngle);

      canvas.beginPath();
      canvas.strokeStyle = tip.strokeStyle;
      canvas.moveTo(tip.x, tip.y);
      canvas.lineTo(leftX, leftY);
      canvas.lineTo(rightX, rightY);
      canvas.closePath();
      canvas.fill();
    },
    draw: function ({
      canvas,
      cord,
      current,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
      drawing: boolean;
    }) {
      if (cord !== null && cord.length <= 2) {
        const right = cord[1] || current;
        const left = cord[0];
        canvas.beginPath();
        canvas.moveTo(left.x, left.y);
        canvas.lineTo(right.x, right.y);
        canvas.strokeStyle = right.strokeStyle;
        canvas.stroke();
        this.drawArrowHead({ canvas, tip: right, prev: left });
      }
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
      drawing: boolean;
    }) => {
      if (cord !== null && cord.length <= 2) {
        const right = cord[1] || current;
        const left = cord[0];
        canvas.beginPath();
        canvas.moveTo(left.x, left.y);
        canvas.lineTo(right.x, right.y);
        canvas.strokeStyle = right.strokeStyle;
        canvas.stroke();
      }
    },
  },
  T: {
    label: "Text",
    hotkey: "T",
    draw: ({}: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
      drawing: boolean;
    }) => {
      console.log("text");
    },
  },
  P: {
    label: "Pencil",
    hotkey: "P",
    draw: ({
      canvas,
      cord,
      drawing,
    }: {
      canvas: CanvasRenderingContext2D;
      cord: SHAPE[];
      current: SHAPE;
      drawing: boolean;
    }) => {
      // console.log(cord);
      if (cord !== null && drawing) {
        if (cord.length < 2) return;
        canvas.beginPath();
        canvas.lineWidth = 2;
        canvas.lineCap = "round";
        canvas.lineJoin = "round";
        canvas.strokeStyle = cord[0].strokeStyle;
        canvas.moveTo(cord[0].x, cord[0].y);

        for (const each of cord) {
          canvas.lineTo(each.x, each.y);
        }
        canvas.stroke();
      }
    },
  },
};
