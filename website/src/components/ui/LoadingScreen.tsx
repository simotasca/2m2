"use client";

import gifLoader from "@/images/loader.gif";
import Image from "next/image";

export default function LoadingScreen({
  loading,
  message,
}: {
  loading: boolean;
  message: string;
}) {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 w-screen h-screen grid place-items-center bg-black bg-opacity-60 z-50">
          <div className="pb-20 flex flex-col items-center">
            <Image src={gifLoader} alt="loader" className="w-12" />
            <p className="text-white font-semibold [text-shadow:0_0_4px_black]">
              {message}...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
