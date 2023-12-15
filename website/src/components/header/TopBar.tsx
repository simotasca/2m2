"use client";

import useTranslation from "@/context/lang/useTranslation";
import iconLocation from "@/images/icons/white/location.svg";
import iconEmail from "@/images/icons/white/mail.svg";
import iconPhone from "@/images/icons/white/phone.svg";
import Image from "next/image";
import Link from "next/link";
import MaxWidthContainer from "../ui/MaxWidthContainer";
import settings from "@/settings";
import i18n from "@/i18n";

export default function TopBar() {
  let { currentLang: lang } = useTranslation();
  const activeLangClass = "font-bold opacity-100 text-sm";

  return (
    <div className="bg-red-gradient text-white -scale-y-100">
      {/** -scale-y-100 reverts the gradient */}
      <MaxWidthContainer className="-scale-y-100 flex flex-row-reverse items-center gap-3 py-1 text-xs">
        <div className="flex flex-row-reverse items-center gap-3 opacity-80 uppercase">
          {i18n.locales.map((locale) => (
            <Link
              key={locale}
              href={"/" + locale === i18n.canonical ? "" : locale}
              className={lang === locale ? activeLangClass : ""}
            >
              {locale}
            </Link>
          ))}
        </div>

        <div className="hidden [@media(min-width:700px)]:contents">
          <div className="w-px h-3 bg-white mx-3"></div>
          <div className="flex items-center gap-1">
            <Image
              src={iconPhone}
              alt="phone icon"
              className="w-3 opacity-80 translate-y-px"
            />
            <p>{settings.info.phone}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={iconEmail}
              alt="email icon"
              className="w-4 opacity-80 translate-y-px"
            />
            <p>{settings.info.email}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={iconLocation}
              alt="location icon"
              className="w-4 opacity-80"
            />
            <p>{settings.info.fullAddress()}</p>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
}
