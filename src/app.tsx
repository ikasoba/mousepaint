import { useEffect, useState } from "preact/hooks";
import { Canvas } from "./components/canvas/Canvas";
import { ToolBar } from "./components/toolbar/ToolBar";
import { AppContext, defaultAppContext } from "./context/AppContext";
import { BrushConfig } from "./components/brushConfig/BrushConfig";

export function App() {
  const [appContext, setAppContext] = useState(defaultAppContext);

  useEffect(() => {
    console.log(appContext);
  }, [appContext]);

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      <div className="flex flex-col h-[100vh] gap-2 bg-stone-800">
        <ToolBar />
        <div className="flex w-[100vw] h-[100vh] gap-2 px-2 flex-col items-center">
          <div class="w-[90vmin]">
            <Canvas />
          </div>
          <BrushConfig />
        </div>
      </div>
    </AppContext.Provider>
  );
}
