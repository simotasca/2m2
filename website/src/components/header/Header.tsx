"use client";

import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import iconHamburger from "@/images/icons/white/hamburger.svg";
import imgLogo from "@/images/logo.svg";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import CartPanel from "../cart/CartPanel";
import SearchModal from "../search/SearchModal";
import MobilePanel, { setMobilePanelOpen } from "./MobilePanel";
import Navbar from "./NavBar";
import SearchBar from "./SearchBar";
import { UserData } from "./UserData";
import TopBar from "./TopBar";

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

      <MobilePanel />

      <TopBar />

      <header
        className={twMerge(
          "sticky top-0 bg-gradient-to-b from-neutral-700 to-neutral-900 text-white z-50 transition-transform",
          open ? "-translate-y-0" : "-translate-y-full",
          small ? " pt-3" : "pt-2 md:pt-4"
        )}
      >
        <MaxWidthContainer
          className={twJoin(
            "grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-5",
            small && "max-sm:items-center"
          )}
        >
          <Hamburger setMobilePanelOpen={setMobilePanelOpen} />

          <Logo small={small} />

          {small ? (
            <div className="max-sm:hidden place-self-center pl-4">
              <Navbar small={small} />
            </div>
          ) : (
            <SearchBar />
          )}

          <UserData small={small} />
        </MaxWidthContainer>

        {!small && (
          <MaxWidthContainer className="pt-2.5 col-span-full max-sm:hidden">
            <Navbar small={small} />
          </MaxWidthContainer>
        )}

        <div className={twMerge(small ? "h-2.5" : "h-2 md:h-4")} />

        <div className="text-dark">{extension && extension}</div>
      </header>
    </>
  );
}

function Hamburger({ setMobilePanelOpen }) {
  return (
    <button onClick={() => setMobilePanelOpen(true)} className="sm:hidden">
      <Image src={iconHamburger} alt="" className="w-6  opacity-90" />
    </button>
  );
}

function Logo({ small }) {
  return (
    <a
      href={routes.home()}
      className={twMerge(
        small
          ? "-translate-y-0.5 max-xs:justify-self-center"
          : "max-sm:justify-self-center"
      )}
    >
      <Image
        src={imgLogo}
        alt="logo 2m2 autoricambi"
        className={"w-14 max-w-none md:w-20"}
      />
    </a>
  );
}
