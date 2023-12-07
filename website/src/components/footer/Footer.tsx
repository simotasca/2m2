"use client";

import Image from "next/image";
import logo2m2 from "@/images/logo.svg";
import gifLoader from "@/images/loader.gif";
import iconTime from "@/images/icons/time.svg";
import MaxWidthContainer from "../ui/MaxWidthContainer";
import { knownCategories } from "@/lib/shared/ecodat";
import useTranslation from "@/context/lang/useTranslation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { Database } from "@/database.types";

import Button from "../ui/Button";
import routes from "@/lib/shared/routes";
import useCart from "@/context/cart/useCart";

export default function Footer() {
  const { setIsOpen } = useCart();
  return (
    <div className="bg-[#363636] text-white py-8 sm:py-14">
      <MaxWidthContainer className="bg-neutral-500 h-px mb-8 max-xs:mx-4"></MaxWidthContainer>

      <MaxWidthContainer className="grid xs:grid-cols-2 sm:grid-cols-[auto_1fr_auto] lg:grid-cols-[minmax(5rem,auto)_auto_1fr_auto] gap-4 sm:gap-16 gap-y-10 lg:px-20">
        <div className="max-lg:col-span-full">
          <Image className="w-20" src={logo2m2} alt="" />
        </div>

        <div className="sm:max-md:row-span-2">
          <h3 className="uppercase font-bold mb-2 leading-5 whitespace-nowrap">
            Car Parts Categories
          </h3>
          <div className="flex flex-col gap-2 text-sm ">
            {Object.keys(knownCategories).map((p) => (
              <ul>
                <li className="leading-4 whitespace-nowrap">{p}</li>
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h3 className="uppercase font-bold mb-2 leading-5 whitespace-nowrap">
            Our Conditions
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="leading-4 whitespace-nowrap">
              Terms and Conditions
            </li>
            <li className="leading-4 whitespace-nowrap">Cooky Policy</li>
            <li className="leading-4 whitespace-nowrap">Privacy Policy</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 max-md:col-span-full">
          <h3 className="uppercase font-bold">Login / Sign up</h3>
          <div className="max-w-[400px]">
            <DropdownLogin small />
          </div>
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className="bg-neutral-500 h-px mt-9 mb-3 max-xs:mx-4"></MaxWidthContainer>

      <MaxWidthContainer className="lg:px-20">
        <div className="flex max-xs:col-span-4 max-xs:px-4">
          <ul className="flex flex-wrap gap-y-2 gap-x-10 text-sm uppercase">
            <li>
              <a
                href={routes.home()}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href={routes.about()}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href={routes.products()}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Search
              </a>
            </li>
            <li>
              <a
                onClick={() => setIsOpen(true)}
                className="hover:underline underline-offset-4 cursor-pointer"
              >
                Your cart
              </a>
            </li>
          </ul>
          <ul className="max-sm:hidden text-sm ml-auto mr-0">
            <li>© 2023 2M2 Ricambi. All rights reserved.</li>
          </ul>
        </div>
      </MaxWidthContainer>

      <div className="h-12"></div>

      <ContactsSection />
    </div>
  );
}

export function Footerc() {
  return (
    <div className="bg-[#363636] text-white py-8 sm:py-14">
      <MaxWidthContainer className="grid xs:grid-cols-[3fr_3fr_auto_3fr] sm:grid-cols-[2fr_3fr_auto_3fr] md:grid-cols-[4fr_5fr_auto_5fr] lg:[3fr_3fr_3fr_4fr]">
        <div className="max-sm:col-span-full sm:col-span-1 flex sm:justify-center items-start max-sm:mb-10 max-sm:pl-6">
          <Image className="w-20" src={logo2m2} alt="" />
        </div>
        <div className="max-sm:col-span-full sm:col-span-1 md:col-span-2 lg:col-span-1 max-lg:pl-6 ">
          <h3 className="uppercase font-bold mb-2 leading-5">
            Car Parts Categories
          </h3>
          <div className="flex flex-col gap-2 text-sm ">
            {Object.keys(knownCategories).map((p) => (
              <ul>
                <li className="leading-4">{p}</li>
              </ul>
            ))}
          </div>
        </div>
        <div className="hidden sm:w-24 md:w-0 lg:hidden"></div>
        <div className="flex flex-col max-sm:col-span-4 sm:col-span-1 gap-2 max-sm:px-6 sm:pr-6 max-sm:pt-8">
          <h3 className="uppercase font-bold">Our Conditions</h3>
          <ul className="flex flex-col gap-1 text-sm">
            <li>Terms and Conditions</li>
            <li>Cooky Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* <div className="max-lg:hidden max-lg:w-10 lg:hidden"></div> */}
        <div className="flex flex-col gap-1 col-span-4 lg:col-span-1 max-lg:pt-8">
          <h3 className="uppercase font-bold max-lg:px-6">Login / Sign up</h3>
          <div className="pr-6 max-lg:pl-6">
            <DropdownLogin small />
          </div>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <div className="bg-neutral-500 h-px mt-9 mb-3 max-xs:mx-4"></div>
        <div className="flex max-xs:col-span-4 max-xs:px-4">
          <ul className="flex flex-wrap gap-y-2 gap-x-10 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Search</li>
            <li>Your cart</li>
          </ul>
          <ul className="max-sm:hidden text-sm ml-auto mr-0">
            <li>Powered By QuartoRaggio</li>
          </ul>
        </div>
        <div className="h-12"></div>
        <ContactsSection></ContactsSection>
      </MaxWidthContainer>
    </div>
  );
}

function DropdownLogin({ small }: { small: boolean }) {
  const { t } = useTranslation();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [user, setUser] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [pwInputType, setPwInputType] = useState<"password" | "text">(
    "password"
  );

  const togglePasswordVisibility = () => {
    setPwInputType(pwInputType === "password" ? "text" : "password");
  };

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.user_metadata?.username);
    })();
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("login-is-loading");
    } else {
      document.body.classList.remove("login-is-loading");
    }
  }, [loading]);

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    if (!email || !password) {
      // TODO: i18n
      setErrorMessage("Inserire email e password");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // TODO: display better error message
      setErrorMessage(error.message + " (" + error.status + ")");
      setLoading(false);
      return;
    }

    router.push("/reserved");
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 w-screen h-screen grid place-items-center bg-black bg-opacity-60 z-50">
          <div className="pb-20 flex flex-col items-center">
            <Image src={gifLoader} alt="loader" className="w-12" />
            <p className="font-semibold [text-shadow:0_0_4px_black]">
              Login in corso...
            </p>
          </div>
        </div>
      )}

      {!user && (
        <section className="pointer-events-auto [&_*]:[min-width:0_!important]">
          <div className="bg-[#363636] text-black">
            <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-2">
              <div className="border border-neutral-500 bg-slate-100">
                <input
                  className="placeholder:text-neutral-500 py-0.5 px-2 text-sm outline-none"
                  type="email"
                  name="email"
                  placeholder="email"
                />
              </div>
              <div className="border border-neutral-500 grid grid-cols-[1fr_auto] px-2 gap-x-2 bg-slate-100 -mt-1">
                <input
                  className="placeholder:text-neutral-500 py-0.5 text-sm outline-none bg-white w-ful"
                  type={pwInputType}
                  name="password"
                  placeholder="password"
                />
                <button
                  className="text-xs text-neutral-500"
                  onClick={(e) => {
                    e.preventDefault();
                    togglePasswordVisibility();
                  }}
                >
                  {pwInputType === "text" ? "hide" : "show"}
                </button>
              </div>

              <a
                className="underline text-xs -mt-1.5 text-neutral-100"
                href="#"
              >
                Forgot your password?
                {/* TODO */}
              </a>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <Button
                type="submit"
                className="w-full font-normal text-sm bg-red-500 text-white"
              >
                Login
              </Button>
            </form>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center text-center px-2 my-1.5 text-neutral-500">
              <hr className="translate-y-px border-neutral-500" />
              <span className="text-neutral-400">or</span>
              <hr className="translate-y-px border-neutral-500" />
            </div>
            <a href="/register">
              <Button className="w-full font-medium text-sm bg-red-gradient text-white">
                Register
              </Button>
            </a>
          </div>
        </section>
      )}
    </>
  );
}

function ContactsSection() {
  return (
    <MaxWidthContainer className="grid md:grid-cols-[3fr_2fr] lg:grid-cols-2 gap-x-12 gap-y-6 max-xs:-ml-2 max-xs:px-6 lg:px-20">
      <div>
        <ul className="flex flex-col gap-1 text-white">
          <li className="contents">
            <div className=" leading-tight">
              <p>
                <span className="text-xs leading-tight">Email: </span>
                <span className="font-medium text-sm leading-tight">
                  assistenza@2m2.com
                </span>
              </p>
            </div>
          </li>
          <li className=" h-px bg-neutral-600"></li>
          <li className="contents">
            <div className=" leading-tight">
              <p>
                <span className="text-xs leading-tight">Telefono: </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium text-sm leading-tight">
                  +39 374 9284720
                </span>
              </p>
            </div>
          </li>
          <li className="col-span-3 h-px bg-neutral-600"></li>
          <li className="contents">
            <div className=" leading-tight">
              <p>
                <span className="text-xs leading-tight">Whatsapp: </span>
                <br className="xs:hidden md:block lg:hidden" />
                <span className="font-medium text-sm leading-tight">
                  +39 374 9284720
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-2 text-white text-sm">
          <li className="flex gap-2 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-4 aspect-square translate-y-px filter invert"
              alt=""
            />
            <p>
              Da <b className="font-medium">Lunedì</b>
              <span> a </span>
              <b className="font-medium">Venerdì</b>
              <span className="">
                :<br className="xs:hidden md:block lg:hidden" /> 08:30-12:30 /
                14:40-17:30
              </span>
            </p>
          </li>
          <li className="flex gap-2 items-center">
            <Image
              src={iconTime}
              className="opacity-70 w-4 aspect-square translate-y-px filter invert"
              alt=""
            />
            <p>
              <b className="font-medium">Sabato</b>
              <span className="">
                :<br className="xs:hidden md:block lg:hidden" /> 08:30-12:30
              </span>
            </p>
          </li>
        </ul>
      </div>
    </MaxWidthContainer>
  );
}
