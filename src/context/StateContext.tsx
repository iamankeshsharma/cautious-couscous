import type { SHAPE } from "@/components/canvas";
import { createContext, useContext, useState } from "react";

type StateDataType = {
  getCanvas: () => CanvasRenderingContext2D | null;
  getCords: () => SHAPE[][] | null;
  setCanvas: (x: CanvasRenderingContext2D) => void;
  setCords: (x: SHAPE[][]) => void;
  setColor: (color: string) => void;
  color: string;
  hotKey: string | null;
  setHotKey: (x: string | null) => void;
};

export const State = createContext<StateDataType | null>(null);

export function Store({ children }: { children: React.ReactNode }) {
  const [canvas, setCanvas] = useState<CanvasRenderingContext2D>();
  const [cords, setCords] = useState<SHAPE[][]>();
  const [color, setColor] = useState<string>("#000000");
  const [hotKey, setHotKey] = useState<string | null>(null);

  const getCords = () => (cords ? cords : null);
  const getCanvas = () => (canvas ? canvas : null);

  return (
    <State.Provider
      value={{
        hotKey,
        setHotKey,
        color,
        setColor,
        getCords,
        getCanvas,
        setCanvas,
        setCords,
      }}
    >
      {children}
    </State.Provider>
  );
}

export function useStore() {
  const context = useContext(State);

  if (!context) {
    throw new Error("useTool must be used within ToolProvider");
  }

  return context;
}
