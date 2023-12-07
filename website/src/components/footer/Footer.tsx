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

export default function Footer() {
  return (
    <div className="bg-[#363636] text-white py-8 sm:py-14">
      <div className=" grid xs:grid-cols-[3fr_3fr_auto_3fr] lg:grid-cols-[3fr_3fr_auto_3fr_auto_5fr]">
        <div className="max-sm:col-span-4  flex sm:justify-center items-start max-sm:mb-10 max-sm:pl-6">
          <Image className="w-20" src={logo2m2} alt=""></Image>
        </div>
        <div className="max-sm:col-span-3 max-lg:pl-6 ">
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
        <div className="hidden xs:w-10 lg:w-4"></div>
        <div className="flex flex-col max-sm:col-span-4 gap-2 max-sm:px-6 sm:pr-6 max-sm:pt-8">
          <h3 className="uppercase font-bold">Our Conditions</h3>
          <ul className="flex flex-col gap-1 text-sm">
            <li>Terms and Conditions</li>
            <li>Cooky Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="max-lg:hidden max-lg:w-10 lg:w-4"></div>
        <div className="flex flex-col gap-1 col-span-4 lg:col-span-1 max-lg:pt-8">
          <h3 className="uppercase font-bold max-lg:px-6">Login / Sign up</h3>
          <div className="pr-6 max-lg:pl-6">
            <DropdownLogin small />
          </div>
        </div>
      </div>
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
        <section className="pointer-events-auto">
          <div className="w-full bg-[#363636]  text-black  gap-y-1">
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
                  className="placeholder:text-neutral-500 py-0.5 text-sm outline-none bg-white w-full"
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
    <div className="grid md:grid-cols-[3fr_2fr] lg:grid-cols-2 gap-x-12 gap-y-6 max-xs:-ml-2 max-xs:px-6">
      <div className="md:pl-6">
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
    </div>
  );
}
