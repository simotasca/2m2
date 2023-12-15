"use client";

import Image from "next/image";
import iconEmail from "@/images/icons/mail-red.svg";
import iconPhone from "@/images/icons/phone-red.svg";
import iconWhatsapp from "@/images/icons/whatsapp.svg";
import iconTime from "@/images/icons/time.svg";
import Button from "@/components/ui/Button";
import settings from "@/settings";
import useTranslation from "@/context/lang/useTranslation";

export default function ContactsSection() {
  const { t, r } = useTranslation("page.contacts");
  return (
    <div className="grid md:grid-cols-[3fr_2fr] lg:grid-cols-2 gap-x-12 gap-y-6 max-xs:-ml-2">
      <div>
        <h3 className="text-2xl font-bold mb-1">{t("title")}</h3>
        <p className="leading-tight">{t("contacts.subtitle")}</p>
      </div>
      <br />
      <div className="md:pl-6">
        <ul className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 items-center">
          <li className="contents">
            <Image className="max-xs:hidden" src={iconEmail} alt=""></Image>
            <div className=" leading-tight">
              <p>
                <span className="text-sm leading-tight">
                  {t("email.title")}{" "}
                </span>
                <span className="font-medium leading-tight">
                  {settings.info.email}
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                {t("email.subtitle")}
              </p>
            </div>
            <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white max-xs:text-sm rounded-full px-10 py-1.5">
              {t("email.button")}
            </Button>
          </li>
          <li className="col-span-3 h-px bg-orange-200"></li>
          <li className="contents">
            <Image className="max-xs:hidden" src={iconPhone} alt=""></Image>
            <div className=" leading-tight">
              <p>
                <span className="text-sm leading-tight">
                  {t("telephone.title")}{" "}
                </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium leading-tight">
                  {settings.info.phone}
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                {t("telephone.subtitle")}
              </p>
            </div>
            <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white max-xs:text-sm rounded-full px-10 py-1.5">
              {t("telephone.button")}
            </Button>
          </li>
          <li className="col-span-3 h-px bg-orange-200"></li>
          <li className="contents">
            <Image className="max-xs:hidden" src={iconWhatsapp} alt=""></Image>
            <div className=" leading-tight">
              <p>
                <span className="text-sm leading-tight">
                  {t("whatsapp.title")}{" "}
                </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium leading-tight">
                  {settings.info.phone}
                </span>
              </p>
              <p className="text-sm text-neutral-500 leading-tight">
                {t("whatsapp.subtitle")}
              </p>
            </div>
            <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white max-xs:text-sm rounded-full px-6 xs:px-10 py-1.5 ">
              {t("whatsapp.button")}
            </Button>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-bold mt-2 md:-mt-4 mb-5 max-xs:max-w-[85vw]">
          {t("timetables.title")}
        </p>

        <ul className="flex flex-col gap-2">
          <li className="flex gap-3 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-6 aspect-square translate-y-px"
              alt=""
            />
            <p>
              {r("timetables.monday-friday")}
              <br className="xs:hidden md:block lg:hidden" />
              <span> {settings.info.openings.monTue}</span>
            </p>
          </li>
          <li className="flex gap-3 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-6 aspect-square translate-y-px"
              alt=""
            />
            <p>
              <b>{r("timetables.saturday")}</b>:
              <br className="xs:hidden md:block lg:hidden" />
              <span> {settings.info.openings.sat}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
