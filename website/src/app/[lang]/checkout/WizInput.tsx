import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputParams = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { id: string; label?: string; errorMessage?: string; required?: boolean };

export default function WizInput({
  className,
  label,
  errorMessage,
  required,
  ...params
}: InputParams) {
  return (
    <div>
      <label htmlFor={params.id}>
        {label && (
          <p className="text-xs pb-px">
            {label}
            {!!errorMessage && (
              <span className="text-red-400 pl-1">{errorMessage}</span>
            )}
            {required && <span className="text-red-400 pl-0.5">*</span>}
          </p>
        )}
      </label>
      <input
        className={twMerge(
          "w-full border border-neutral-300 outline-none text-sm px-2 py-1 placeholder:text-neutral-500 rounded-sm",
          errorMessage !== undefined &&
            "outline outline-1 outline-red-500 -outline-offset-1"
        )}
        {...params}
      />
    </div>
  );
}
