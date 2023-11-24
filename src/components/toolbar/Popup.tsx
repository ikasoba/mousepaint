import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { createPopper, Placement } from "@popperjs/core";

export function Popup(
  { title, placement = "bottom", children }:
    & { title?: string; placement?: Placement }
    & JSX.HTMLAttributes<HTMLButtonElement>,
) {
  const [isPopover, setIsPopover] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const popper = useMemo(() => {
    if (isPopover && btn.current && container.current) {
      return createPopper(btn.current, container.current, {
        placement: placement,
      });
    } else {
      return null;
    }
  }, [isPopover, container, btn]);

  useEffect(() => {
    if (isPopover) {
      popper?.update();
    }
  }, [isPopover, popper]);

  return (
    <div>
      <button
        ref={btn}
        className="text-white"
        onClick={() => setIsPopover(!isPopover)}
      >
        {title}...
      </button>
      <div
        className="bg-stone-700 text-white border border-stone-500 p-2 flex flex-col relative shadow-[#0004] shadow-md"
        ref={container}
        style={{ display: isPopover ? null : "none" }}
      >
        {children}
      </div>
    </div>
  );
}
