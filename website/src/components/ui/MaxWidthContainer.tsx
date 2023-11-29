import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const MaxWidthContainer: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        `w-full max-w-screen-xl mx-auto px-3 sm:px-6`,
        className
      )}>
      {children}
    </div>
  );
};

export default MaxWidthContainer;
