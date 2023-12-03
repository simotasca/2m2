// import { twMerge } from "tailwind-merge";
// import type { FC, PropsWithChildren } from "react";

// const Title: FC<PropsWithChildren<{ as: string; className: string }>> = ({
//   as: Component = "a",
//   className,
//   children,
//   ...props
// }) => {
//   className = twMerge(
//     "font-oswald text-3xl font-semibold uppercase",
//     className
//   );
//   return <Component {...props}>{children}</Component>;
// };

// function Red({ children }) {
//   return <span className="text-red-700">{children}</span>;
// }

// Title.Red = Red;

// function Grey({ children }) {
//   return <span className="text-gray-500 font-medium">{children}</span>;
// }

// Object.assign(Title, Red, Grey);
