import { createContext } from "preact";

export interface AppContext {
  color: string;
  brushSize: number;
  stabilization: number;
  xBias: number;
  yBias: number;
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
}

export const defaultAppContext: AppContext = {
  color: "#000",
  brushSize: 4,
  stabilization: 5,
  xBias: 5,
  yBias: 5,
};

export const AppContext = createContext<{
  appContext: AppContext;
  setAppContext: (value: AppContext) => void;
}>(null as any);
