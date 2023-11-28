"use client";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import useTranslation from "@/context/lang/useTranslation";
import iconHamburger from "@/images/icons/white/hamburger.svg";
import iconPhone from "@/images/icons/white/phone.svg";
import imgLogo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import CartPanel from "../cart/CartPanel";
import SearchModal from "../search/SearchModal";
import Navbar from "./NavBar";
import SearchBar from "./SearchBar";
import { UserData } from "./UserData";

interface Props {
  extension?: React.ReactNode;
  small: boolean;
}

export default function Header({ extension, small = true }: Props) {
  const [open, setOpen] = useState(true);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currPos = window.scrollY;
      setOpen(
        currPos < window.innerHeight * 0.8 || lastScrollPos.current > currPos
      );
      lastScrollPos.current = currPos;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SearchModal />

      <CartPanel />

      <TopBar />

      <header
        className={twMerge(
          "sticky top-0 bg-gradient-to-b from-neutral-700 to-neutral-900 text-white z-50 transition-transform",
          open ? "-translate-y-0" : "-translate-y-full",
          small ? "pt-2" : "pt-2 sm:pt-4"
        )}>
        <MaxWidthContainer className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-5">
          <button className="sm:hidden">
            <Image src={iconHamburger} alt="" className="w-6 ml-2 opacity-90" />
          </button>
          <div
            className={twMerge(
              "max-sm:justify-self-center",
              small && "-translate-y-0.5"
            )}>
            <Logo />
          </div>
          {small ? (
            <div className="place-self-center pl-4">
              <Navbar small={small} />
            </div>
          ) : (
            <div className="col-span-full order-3 mt-2 sm:contents">
              <SearchBar />
            </div>
          )}
          <UserData />
        </MaxWidthContainer>
        {!small && (
          <MaxWidthContainer className="pt-2.5 col-span-full">
            <Navbar small={small} />
          </MaxWidthContainer>
        )}
        <div className={twMerge(small ? "h-2" : "h-3 sm:h-4")}></div>
        <div className="text-dark">{extension && extension}</div>
      </header>
    </>
  );
}

function Logo() {
  return (
    <a href="/">
      <Image
        src={imgLogo}
        alt="logo 2m2 autoricambi"
        className="w-14 sm:w-20"
      />
    </a>
  );
}

function TopBar() {
  let { currentLang: lang } = useTranslation();
  const activeLangClass = "font-bold opacity-100 text-sm";

  return (
    <div className="bg-red-gradient text-white -scale-y-100">
      {/** -scale-y-100 reverts the gradient */}
      <MaxWidthContainer className="-scale-y-100 flex flex-row-reverse items-center gap-3 py-1 text-xs">
        <div className="flex flex-row-reverse items-center gap-3 opacity-80">
          <Link href="/" className={lang == "it" ? activeLangClass : ""}>
            IT
          </Link>
          <Link href="/en" className={lang == "en" ? activeLangClass : ""}>
            EN
          </Link>
          <Link href="/fr" className={lang == "fr" ? activeLangClass : ""}>
            FR
          </Link>
          <Link href="/es" className={lang == "es" ? activeLangClass : ""}>
            ES
          </Link>
        </div>

        <div className="hidden sm:contents">
          <div className="w-px h-3 bg-white mx-3"></div>
          <div className="flex items-center gap-1">
            <Image
              src={iconPhone}
              alt="phone icon"
              className="w-5 opacity-80"
            />
            <p>+39 333 1234567</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={iconPhone}
              alt="phone icon"
              className="w-5 opacity-80"
            />
            <p>mail@domain.com</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={iconPhone}
              alt="phone icon"
              className="w-5 opacity-80"
            />
            <p>Str. Campirolo 1, 43044 Collecchio PR</p>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
