import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export default function Button({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      className={twMerge(
        "flex justify-center items-center gap-2 px-4 py-1 text-center bg-neutral-300 rounded font-semibold",
        className
      )}
      {...props}>
      {children}
    </button>
  );
}
