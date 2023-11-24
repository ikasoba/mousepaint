import { useEffect, useMemo, useRef } from "preact/hooks";
import { AppContext } from "../../context/AppContext";
import { useFrame } from "../../utils/2d";
import { useContextProxy } from "../../utils/stateProxy";

export function Canvas() {
  const { appContext, setAppContext } = useContextProxy(AppContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const history = useMemo<ImageData[]>(() => [], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    console.log({ ...appContext });
    setAppContext({
      ...appContext,
      canvas: canvas,
      context: ctx,
    });

    let brushX = 0,
      brushY = 0,
      isDrawing = false,
      prevIsDrawing = isDrawing,
      movementX = 0,
      movementY = 0,
      realMouseX = 0,
      realMouseY = 0,
      fakeMouseX = 0,
      fakeMouseY = 0,
      fakeMouseUpX: number | null = null,
      fakeMouseUpY: number | null = null,
      isCursorLock = false,
      prevImage: ImageData | null = null,
      ink = 10;

    canvas.addEventListener("mousedown", () => {
      if (isCursorLock == false && document.pointerLockElement == null) {
        canvas.requestPointerLock();
        isCursorLock = true;
      }

      if (isDrawing == false) {
        brushX = fakeMouseX;
        brushY = fakeMouseY;

        console.log("*", brushX, brushY);
        isDrawing = true;

        fakeMouseUpX = null;
        fakeMouseUpY = null;
      }
    });

    document.addEventListener("pointerlockchange", () => {
      console.log("l", document.pointerLockElement);
      if (!document.pointerLockElement) {
        isCursorLock = false;
      }
    });

    canvas.addEventListener("mouseup", () => {
      if (isDrawing) {
        isDrawing = false;

        fakeMouseUpX = fakeMouseX;
        fakeMouseUpY = fakeMouseY;
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      realMouseX = (e.x - canvas.offsetLeft) *
        (canvas.width / canvas.clientWidth);
      realMouseY = (e.y - canvas.offsetTop) *
        (canvas.height / canvas.clientHeight);

      if (isCursorLock) {
        fakeMouseX += e.movementX / appContext.xBias;
        fakeMouseY += e.movementY / appContext.yBias;
      } else {
        fakeMouseX = realMouseX;
        fakeMouseY = realMouseY;
      }
      return;
    });

    canvas.addEventListener("mouseenter", (e) => {
      console.log("enter");
      realMouseX = e.x - canvas.offsetLeft;
      realMouseY = e.y - canvas.offsetTop;

      fakeMouseX = realMouseX;
      fakeMouseY = realMouseY;
    });

    canvas.addEventListener("mouseleave", () => {
      console.log("leave");
    });

    canvas.addEventListener("keydown", (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }

      console.log(e.ctrlKey, e.key, history);
      if (e.ctrlKey && e.key == "z") {
        const data = history.pop();
        if (data) {
          prevImage = data;
          ctx.putImageData(data, 0, 0);
          console.log("restored");
        }

        return e.preventDefault();
      }
    });

    ctx.lineWidth = appContext.brushSize;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const stop = useFrame((_, next) => {
      ctx.strokeStyle = appContext.color;

      if (prevImage) {
        ctx.putImageData(prevImage, 0, 0);
        prevImage = null;
      }

      if (fakeMouseUpX != null && fakeMouseUpY != null) {
        movementX = (fakeMouseUpX - brushX) / appContext.stabilization;
        movementY = (fakeMouseUpY - brushY) / appContext.stabilization;
      } else {
        movementX = (fakeMouseX - brushX) / appContext.stabilization;
        movementY = (fakeMouseY - brushY) / appContext.stabilization;
      }

      const movement = (Math.abs(movementX) + Math.abs(movementY)) / 2;
      ctx.lineWidth = appContext.brushSize / Math.max(1, movement / 10);

      if (prevIsDrawing == false && isDrawing == true) {
        history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        console.log("history pushed");
      }

      if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(brushX, brushY);
        ctx.lineTo(
          brushX += movementX,
          brushY += movementY,
        );

        ctx.stroke();
        ctx.closePath();
      } else if (fakeMouseUpX != null && fakeMouseUpY != null) {
        ctx.globalAlpha = (ink -= 1) / 10;

        ctx.beginPath();
        ctx.moveTo(brushX, brushY);
        ctx.lineTo(
          brushX += movementX,
          brushY += movementY,
        );
        ctx.stroke();
        ctx.closePath();

        if (
          Math.abs(fakeMouseUpX - brushX) < 10 &&
          Math.abs(fakeMouseUpY - brushY) < 10
        ) {
          ctx.globalAlpha = 1;
          ink = 10;
          fakeMouseUpX = null;
          fakeMouseUpY = null;
        }
      } else {
        brushX += movementX;
        brushY += movementY;
        movementX = 0;
        movementY = 0;
      }

      prevIsDrawing = isDrawing;

      prevImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const { data } = ctx.getImageData(fakeMouseX, fakeMouseY, 1, 1);
      ctx.fillStyle = `rgb(${data.slice(0, 3).map((x) => 255 - x).join(", ")})`;
      ctx.beginPath();
      ctx.arc(fakeMouseX, fakeMouseY, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      next();
    });

    return stop;
  }, [canvasRef]);

  return (
    <div className="bg-stone-500 rounded-md p-1 w-full h-full">
      <canvas
        className="rounded-sm aspect-ratio[4/3] w-full h-full"
        ref={canvasRef}
        width={1280}
        height={960}
        tabIndex={0}
      >
      </canvas>
    </div>
  );
}
