import { JSX } from "preact/jsx-runtime";

export function NormalButton(
  { children, ...props }: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className="bg-white text-black shadow-[#0004] shadow-sm p-1 min-w-[4rem] border-b-2 border-b-gray-200 rounded-lg active:(border-b-0 border-t-2 active:border-t-gray-200)"
    >
      {children}
    </button>
  );
}
