import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { twJoin } from "tailwind-merge";

export function Label({
  children,
  className,
  text,
  required,
}: PropsWithChildren<{
  className?: string;
  text: string;
  required?: boolean;
}>) {
  return (
    <div className={className}>
      <label>
        <p className="text-xs font-semibold pb-0.5 pl-0.5">
          <span>{text}</span>
          {required && <span className="text-red-500 pl-px">*</span>}
        </p>
        {children}
      </label>
    </div>
  );
}

type InputParams = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { errorMessage?: string; required?: boolean };

export function Input({
  className,
  errorMessage,
  required,
  type,
  ...params
}: InputParams) {
  return (
    <input
      className={twJoin(
        "w-full border border-neutral-300 bg-white outline-none px-2 py-1 placeholder:text-neutral-500 rounded-sm text-sm cursor-text",
        errorMessage !== undefined &&
          "outline outline-1 outline-red-500 -outline-offset-1"
      )}
      type={type}
      {...params}
    />
  );
}
