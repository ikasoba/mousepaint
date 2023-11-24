import { useContext } from "preact/hooks";
import { AppContext } from "../../context/AppContext";

export function BrushConfig() {
  const { appContext, setAppContext } = useContext(AppContext);

  return (
    <div className="flex-1 bg-stone-600 text-white rounded-l-lg w-full flex flex-col p-2 h-fit">
      <label>
        色:
        <input
          type="color"
          value={appContext.color}
          onChange={(e) =>
            setAppContext({
              ...appContext,
              color: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
      <label>
        ブラシサイズ{" "}
        <span className="w-4 h-4 inline-flex justify-center items-center">
          <span
            style={{
              position: "absolute",
              width: `${appContext.brushSize}px`,
              aspectRatio: "1 / 1",
              background: "black",
              borderRadius: "100%",
              border: "solid 1px white",
            }}
          >
          </span>
        </span>:<br />
        <input
          className="w-full"
          type="range"
          step={1}
          value={appContext.brushSize}
          onInput={(e) =>
            setAppContext({
              ...appContext,
              brushSize: +(e.target as HTMLInputElement).value || 1,
            })}
        />
      </label>
      <label>
        手ブレ補正 {appContext.stabilization}:<br />
        <input
          className="w-full"
          type="range"
          step={2.5}
          value={appContext.stabilization}
          onInput={(e) =>
            setAppContext({
              ...appContext,
              stabilization: +(e.target as HTMLInputElement).value,
            })}
        />
      </label>
      <label>
        X遅さ {appContext.xBias}:<br />
        <input
          className="w-full"
          type="range"
          step={1}
          value={appContext.xBias}
          onInput={(e) =>
            setAppContext({
              ...appContext,
              xBias: +(e.target as HTMLInputElement).value,
            })}
        />
      </label>
      <label>
        Y遅さ {appContext.yBias}:<br />
        <input
          className="w-full"
          type="range"
          step={1}
          value={appContext.yBias}
          onInput={(e) =>
            setAppContext({
              ...appContext,
              yBias: +(e.target as HTMLInputElement).value,
            })}
        />
      </label>
    </div>
  );
}
