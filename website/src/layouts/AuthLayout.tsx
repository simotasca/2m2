import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import imgBg from "@/images/main-background-engine.jpg";
import Image from "next/image";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="p-4 sm:p-8 z-10">
      <Image
        src={imgBg}
        alt="backgorund cover"
        className="fixed inset-0 w-full h-full object-cover -z-20"
      />
      <div className="fixed inset-0 w-full h-full bg-black bg-opacity-30 -z-10"></div>

      <MaxWidthContainer className="max-w-sm z-20 bg-white p-4 rounded [box-shadow:0px_0px_100px_black]">
        {children}
      </MaxWidthContainer>
    </div>
  );
}
