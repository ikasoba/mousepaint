import { JSX } from "preact/jsx-runtime";

export function PrimaryButton(
  { children, ...props }: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className="bg-yellow-500 text-white font-bold p-1 min-w-[4rem] border-b-2 border-b-yellow-600 rounded-lg active:(border-b-0 border-t-2 active:border-t-yellow-600)"
    >
      {children}
    </button>
  );
}
