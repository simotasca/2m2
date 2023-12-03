import { twMerge } from "tailwind-merge";
import type { ElementType, FC, PropsWithChildren } from "react";

type TitleComponent = FC<
  PropsWithChildren<{ as?: ElementType; className?: string }>
> & {
  Red: FC<PropsWithChildren>;
  Gray: FC<PropsWithChildren>;
};

const Title: TitleComponent = ({
  as: Component = "p",
  className,
  children,
  ...props
}) => {
  className = twMerge(
    "font-oswald text-3xl font-semibold uppercase",
    className
  );
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

Title.Red = ({ children }) => {
  return <span className="text-red-700">{children}</span>;
};

Title.Gray = ({ children }) => {
  return <span className="text-neutral-400">{children}</span>;
};

export default Title;
