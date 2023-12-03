import Image from "next/image";
import logo from "@/images/logo-dark.svg";

export default function Loading() {
  return (
    <div className="bg-white w-screen h-screen grid place-content-center">
      <div className="text-[min(10rem,10vw)] font-oswald -translate-y-10 text-neutral-600 leading-[1]">
        <span>CARICA</span>
        <div className="relative text-red-500 inline-block">
          <span>M</span>
        </div>
        <span>ENTO</span>
      </div>
      <Image
        src={logo}
        alt="logo 2emme2 autoricambi"
        className="fixed bottom-4 right-4 w-14"
      />
    </div>
  );
}
