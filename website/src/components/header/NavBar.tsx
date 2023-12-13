"use client";

import { useTranslation } from "@/context/lang/client";
import iconDown from "@/images/icons/white/down.svg";
import routes from "@/lib/shared/routes";
import Image from "next/image";
import Link from "next/link";
import { twJoin, twMerge } from "tailwind-merge";

export default function Navbar({ small }: { small: boolean }) {
  const { t } = useTranslation();
  return (
    <nav
      className={twMerge(
        "flex items-center justify-center gap-x-4 font-medium max-md:text-sm",
        small ? "translate-y-px lg:gap-x-8" : "md:gap-x-8"
      )}>
      <Link href={routes.home()}>{t("header.navbar.home")}</Link>
      <DropdownCarParts small={small} />
      <DropdownModels small={small} />
      <Link href={routes.about()}>{t("header.navbar.about")}</Link>
      <Link className={twJoin(small && "max-md:hidden")} href="#">
        {t("header.navbar.contacts")}
      </Link>
    </nav>
  );
}

function DropdownCarParts({ small }) {
  const { t } = useTranslation();
  return (
    <button
      className={twMerge(
        "outline-none flex items-center gap-1 border border-[#DA8D6C] bg-[linear-gradient(180deg,#DB5F06_30%,#D20404_180%)] rounded pl-3 pr-1.5 sm:pl-5 sm:pr-4 py-1",
        !small && "md:py-2"
      )}>
      <span>{t("header.navbar.parts.title")}</span>
      <Image src={iconDown} alt="dropdown icon" className="w-4 mt-0.5" />
    </button>
  );
}

function DropdownModels({ small }) {
  const { t } = useTranslation();
  return (
    <button
      className={twMerge(
        "outline-none flex items-center gap-1 px-1 py-1",
        small ? "max-md:hidden" : "md:py-2"
      )}>
      <span>{t("header.navbar.models.title")}</span>
      <Image src={iconDown} alt="dropdown icon" className="w-4 mt-0.5" />
    </button>
  );
}
