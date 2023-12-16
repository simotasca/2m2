import iconLogo from "@/images/logo-dark.svg";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import imgBg from "@/images/main-background-engine.jpg";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

type TitleComponent = FC<PropsWithChildren> & {
  Image: FC;
  Title: FC<PropsWithChildren>;
};

const AuthLayout: TitleComponent = ({ children }) => {
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
};

AuthLayout.Image = () => {
  return (
    <Link href={routes.home()}>
      <Image
        src={iconLogo}
        alt="logo 2m2 autoricambi"
        className="w-16 mx-auto"
      />
    </Link>
  );
};

AuthLayout.Title = ({ children }) => {
  return (
    <h1 className="text-xl text-center font-bold mt-3 mb-2 uppercase">
      {children}
    </h1>
  );
};

export default AuthLayout;
