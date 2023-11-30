"use client";

import { useEffect, useState } from "react";
import imgCarbonFiber from "@/images/carbon-fiber.png";
import Client from "./Client";
import { knownCategories } from "@/lib/shared/ecodat";
import routes from "@/lib/shared/routes";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { shuffle } from "@/lib/shared/array";

export default function DemoPage() {
  // return <Client />;
  return (
    <div>
      <CategoriesSection />
    </div>
  );
}

function CategoriesSection() {
  const colors = [
    "[&:nth-child(4n)]:bg-[#292929]", // grey
    "[&:nth-child(4n-1)]:bg-[#131313]", // black
    "[&:nth-child(4n-2)]:bg-[#E1E1E1] [&:nth-child(4n-2)]:text-dark", // white
    "[&:nth-child(4n-3)]:bg-[#B30A0A]", // red
  ];

  const [categories, setCategories] = useState<string[]>();
  useEffect(() => {
    setCategories(shuffle(Object.keys(knownCategories)));
  }, []);

  if (!categories) return <></>;

  return (
    <div className="relative grid grid-cols-6 shadow-[0px_3px_5px_#00000030] z-10">
      {categories.map((key) => (
        <a
          href={routes.category(key)}
          className={twMerge(
            "group relative text-left text-white aspect-video overflow-hidden",
            colors
          )}
          key={key}>
          <img
            src={knownCategories[key].image}
            className={twMerge(
              "absolute bottom-0 right-0 w-full h-full object-contain object-right-bottom z-10",
              "origin-bottom-right scale-95 transition-transform group-hover:scale-100"
            )}
          />
          <Image
            src={imgCarbonFiber}
            alt=""
            className="absolute bottom-0 w-full h-full object-contain object-right-bottom mix-blend-color-dodge"
          />
          <div className="relative h-full p-4 pb-8 pr-[50%] flex flex-col justify-between uppercase leading-[1.1] z-20">
            <p className="font-bold opacity-90 text-lg leading-[1]">{key}</p>
            <p className="text-xs group-hover:underline underline-offset-4">
              view more
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
