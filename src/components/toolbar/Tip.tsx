import { JSX } from "preact/jsx-runtime";

export function Tip(
  { children, ...props }: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className="text-white"
    >
      {children}
    </button>
  );
}
