import Image from "next/image";
import iconLogo from "@/images/logo.svg";
import { twMerge } from "tailwind-merge";
import iconSearch from "@/images/icons/search.svg";
import iconDown from "@/images/icons/white/down.svg";
import iconPhone from "@/images/icons/white/phone.svg";
import iconEmail from "@/images/icons/white/mail.svg";
import iconLocation from "@/images/icons/white/location.svg";
import iconWhatsapp from "@/images/icons/white/whatsapp.svg";
import useTranslation from "@/context/lang/useTranslation";
import { openSearchModal } from "../search/SearchModal";
import { UserData } from "./UserData";
import Button from "../ui/Button";

export default function MobilePanel() {
  return (
    <div
      className={twMerge(
        "fixed w-screen h-screen top-0 left-full bg-dark text-white transition-transform duration-300 z-[51]",
        "[.mobile-panel-open_&]:-translate-x-full"
      )}
    >
      <div className="relative flex items-start py-1 px-4">
        <button className="text-2xl" onClick={() => setMobilePanelOpen(false)}>
          x
        </button>
        <div className="absolute right-1/2 translate-x-1/2 mt-[5px]">
          <Image className="w-12 xs:w-16" src={iconLogo} alt="logo 2m2"></Image>
        </div>
        <div className="ml-auto mr-0 mt-1">
          <UserData small></UserData>
        </div>
      </div>
      <div className="w-full px-4 pt-6">
        <SearchBar></SearchBar>
      </div>
      <div className="flex flex-col gap-2 p-6">
        <a href="">
          <span className="text-white">HOME</span>
        </a>
        <div className="h-px bg-neutral-500"></div>
        <a href="">
          <span className="text-white">ABOUT</span>
        </a>
        <div className="h-px bg-neutral-500"></div>
        <div className="h-4"></div>
        <div className="px-0">
          <Contacts></Contacts>
        </div>
        <div className="h-1 xs:h-2"></div>

        <div className="flex items-start gap-2">
          <Image
            src={iconLocation}
            alt="phone icon"
            className="w-4 opacity-80 mt-[3px]"
          />
          <p className="text-sm xs:text-base leading-5">
            Str. Campirolo 1, 43044 Collecchio PR
          </p>
        </div>
      </div>
      <div className="absolute flex items-center translate-x-1/2 right-1/2 bottom-2">
        <div className="flex gap-1">
          <span className="text-white text-sm whitespace-nowrap">
            Termini e condizioni
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-white text-sm">Login/Registrati</span>
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  const { t } = useTranslation();
  return (
    <div className="h-full rounded border border-neutral-500 flex items-stretch py-2">
      <label
        htmlFor="header-search-bar"
        className="flex-shrink-0 flex items-center h-full [@media(max-width:930px)]:hidden"
      >
        <Image src={iconSearch} alt="search icon" className="w-5 mx-3 mt-0.5" />
      </label>
      <div className="relative flex items-center flex-1 mr-2 md:mr-4">
        <div className="absolute top-1/2 translate-y-3 w-full h-px bg-neutral-300 max-md:hidden"></div>
        <input
          id="header-search-bar"
          type="text"
          className=" w-full focus:outline-none placeholder:text-neutral-500 text-neutral-700 max-sm:py-0.5 placeholder:text-sm ml-2"
          placeholder={t("header.search-bar.placeholder")}
        />
      </div>
      <button className="flex items-center px-3 rounded-sm bg-gradient-to-br from-red-700 to-red-500 text-white font-bold">
        <Image
          src={iconSearch}
          alt=""
          className="w-5  filter invert brightness-0 opacity-90"
        />
      </button>
      {/* <DropdownSearchFilters /> */}
      <button
        onClick={() => openSearchModal()}
        className="h-full outline-none flex items-center px-3 text-white font-medium"
      >
        <span>{t("header.search-bar.filters.title")}</span>
        <Image
          src={iconDown}
          alt="dropdown icon"
          className="w-4 ml-1 translate-y-px "
        />
      </button>
    </div>
  );
}

function Contacts() {
  return (
    <div>
      <h2 className="text-white mb-2">CONTACTS</h2>
      <ul className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 items-center">
        <li className="contents">
          <Image className="max-xs:hidden" src={iconEmail} alt=""></Image>
          <div className=" leading-tight">
            <p>
              <span className="text-xs xs:text-sm leading-tight">Email: </span>
              <span className="text-sm font-medium leading-tight">
                assistenza@2m2.com
              </span>
            </p>
            <p className="text-xs xs:text-sm text-neutral-200 leading-tight">
              Ti risponderemo a breve
            </p>
          </div>
          <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white text-xs rounded-full px-10 py-1.5 ml-auto mr-0">
            Scrivici
          </Button>
        </li>
        <li className="col-span-3 h-px bg-neutral-500"></li>
        <li className="contents">
          <Image className="max-xs:hidden" src={iconPhone} alt=""></Image>
          <div className=" leading-tight">
            <p>
              <span className="text-xs xs:text-sm leading-tight">
                Telefono:{" "}
              </span>
              <br className="xs:hidden " />
              <span className="text-sm font-medium leading-tight">
                +39 374 9284720
              </span>
            </p>
            <p className="text-xs xs:text-sm text-neutral-200 leading-tight">
              Parla con un operatore
            </p>
          </div>
          <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white text-xs rounded-full px-10 py-1.5 ml-auto mr-0">
            Chiama
          </Button>
        </li>
        <li className="col-span-3 h-px bg-neutral-500"></li>
        <li className="contents">
          <Image className="max-xs:hidden" src={iconWhatsapp} alt=""></Image>
          <div className=" leading-tight">
            <p>
              <span className="text-xs xs:text-sm leading-tight">
                Whatsapp:{" "}
              </span>
              <br className="xs:hidden " />
              <span className="text-sm font-medium leading-tight">
                +39 374 9284720
              </span>
            </p>
            <p className="text-xs xs:text-sm text-neutral-200 leading-tight">
              Ti risponderemo appena possibile
            </p>
          </div>
          <Button className="w-full max-xs:max-w-[30vw] uppercase bg-orange-500 text-white text-xs rounded-full px-6 xs:px-10 py-1.5 ml-auto mr-0">
            CHAT
          </Button>
        </li>
      </ul>
    </div>
  );
}

/** to toggle just leave val undefined */
export function setMobilePanelOpen(val?: boolean) {
  if (val ?? !isOpen()) {
    document.documentElement.classList.add("mobile-panel-open");
  } else {
    document.documentElement.classList.remove("mobile-panel-open");
  }
}

function isOpen() {
  return document.documentElement.classList.contains("mobile-panel-open");
}
