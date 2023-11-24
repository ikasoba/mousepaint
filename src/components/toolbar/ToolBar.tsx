import { useContext } from "preact/hooks";
import { Popup } from "./Popup.js";
import { Tip } from "./Tip.js";
import { AppContext } from "../../context/AppContext.js";

export function ToolBar() {
  const { appContext } = useContext(AppContext);

  return (
    <div className="bg-stone-700 text-white p-2 flex">
      <Popup title="ファイル">
        <Tip
          onClick={() =>
            appContext.canvas?.toBlob((blob) => {
              if (blob == null) return;
              const a = document.createElement("a");
              a.download = "canvas.png";
              a.href = URL.createObjectURL(blob);

              a.click();
            }, "image/png")}
        >
          保存
        </Tip>
      </Popup>
    </div>
  );
}
