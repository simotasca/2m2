"use client";

import Button from "@/components/ui/Button";
import iconLock from "@/images/icons/lock.svg";
import iconPackage from "@/images/icons/package.svg";
import imgLogo from "@/images/logo-dark.svg";
import imgBg from "@/images/main-background-engine.jpg";
import { EcodatArticle } from "@/lib/shared/ecodat";
import Image from "next/image";
import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { CheckoutTab } from "./CheckoutTab";
import { DeliveryAddress, DeliveryAddressTab } from "./DeliveryAddressTab";
import { PersonalInfoTab, type PersonalInfo } from "./PersonalInfoTab";
import WizTabValidator from "./WizTabHandle";

interface Props {
  products: EcodatArticle[];
}

export default function CheckoutClientPage({ products }: Props) {
  /* TODO: pre-populate with registered user info */
  // state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({});
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({});
  const [paymentClientSecret, setPaymentClientSecret] = useState<string>();

  // imperative handles for validation
  const personalInfoHandle = useRef<WizTabValidator>(null);
  const deliveryHandle = useRef<WizTabValidator>(null);
  const checkoutHandle = useRef<WizTabValidator>(null);

  // wizard management
  const [wizStep, setWizStep] = useState(0);
  const wizard = [
    <PersonalInfoTab
      ref={personalInfoHandle}
      personalInfo={personalInfo}
      setPersonalInfo={setPersonalInfo}
    />,
    <DeliveryAddressTab
      ref={deliveryHandle}
      address={deliveryAddress}
      setAddress={setDeliveryAddress}
    />,
    <CheckoutTab
      ref={checkoutHandle}
      clientSecret={paymentClientSecret}
      setClientSecret={setPaymentClientSecret}
      email={personalInfo.email}
      amount={products.reduce((tot, p) => tot + p.price, 0)}
      metadata={{
        ...personalInfo,
        ...deliveryAddress,
        products: products.map((p) => p.id).join(";"),
      }}
    />,
  ];
  const wizHandles = [personalInfoHandle, deliveryHandle];
  const currWizard = wizard[wizStep];
  const [hideWiz, setHideWiz] = useState(false);

  const changeWizStep = async (cb: (prev: number) => number) => {
    const nextStep = cb(wizStep);
    if (nextStep >= wizard.length) return;

    const handle = wizHandles[wizStep]?.current;
    if (nextStep > wizStep && !handle?.validate()) return;

    // hide current step
    setHideWiz(true);
    await new Promise((res) => setTimeout(res, 200));
    // set next step
    setWizStep(nextStep);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setHideWiz(false);
    await new Promise((res) => setTimeout(res, 200));
    // focus next step input
    const nextStepFocusHandle = wizHandles[nextStep]?.current?.focus;
    nextStepFocusHandle && nextStepFocusHandle();
  };

  // focus first wizard input
  useEffect(() => {
    const focus = personalInfoHandle?.current?.focus;
    focus && focus();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Image
        src={imgBg}
        alt="backgorund cover"
        className="fixed inset-0 w-full h-full object-cover -z-20"
      />
      <div className="fixed inset-0 w-full h-full bg-black bg-opacity-30 -z-10"></div>
      <div className="p-8">
        <div className="max-w-screen-md mx-auto flex flex-col gap-3 pt-5 py-6 px-4 md:px-8 bg-white overflow-hidden">
          <Breadcrumbs wizStep={wizStep} changeWizStep={changeWizStep} />
          {/* split panel */}
          <div className="sm:grid grid-cols-2 gap-8">
            {/* wizard */}
            <div
              className={twMerge(
                "relative transition-transform duration-200",
                hideWiz && "-translate-x-5"
              )}>
              {currWizard}
              {wizStep < wizard.length - 1 && (
                <Button
                  onClick={() => changeWizStep((s) => s + 1)}
                  className="bg-red-gradient text-white max-sm:ml-auto mr-0">
                  Next
                </Button>
              )}
              <div className="sm:hidden h-6"></div>
              <div
                className={twMerge(
                  "absolute inset-0 w-full h-full bg-white z-10 transition-all duration-200",
                  hideWiz
                    ? "opacity-100 pointer-events-none"
                    : "opacity-0 pointer-events-none"
                )}></div>
            </div>
            {/* order details */}
            <OrderDetails
              isLastStep={wizStep === wizard.length - 1}
              products={products}
              personalInfo={personalInfo}
              deliveryAddress={deliveryAddress}
            />
          </div>
          {/* help */}
          <div className="text-xs text-neutral-500 flex flex-col gap-2 pt-4 border-t border-neutral-200">
            <p>
              Hai bisogno di aiuto? Consulta le pagine d'aiuto oppure contattaci
            </p>
            <p>
              Cosa succede quando si effettua un ordine? Cliccando sul pulsante
              "Acquista ora" ti invieremo un messaggio con la conferma di
              ricezione dell'ordine. Il contratto di acquisto di un articolo non
              sarà perfezionato fino al ricevimento del messaggio che conferma
              la spedizione degli articoli.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDetails({
  products,
  personalInfo,
  deliveryAddress,
  isLastStep,
}: {
  products: EcodatArticle[];
  personalInfo: PersonalInfo;
  deliveryAddress: DeliveryAddress;
  isLastStep: boolean;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div>
          <h3 className="inline uppercase font-bold">
            Your <span className="text-red-500">order</span>
          </h3>
          <a href="/cart" className="text-sm ml-2 underline text-neutral-500">
            review
          </a>
        </div>
        <Image className="w-5 opacity-70" alt="logo 2m2" src={iconLock}></Image>
      </div>
      <div className="border-y border-neutral-300 py-2">
        <div className="-mr-2">
          <div className="grid grid-cols-[1fr_auto] gap-2 max-h-48 overflow-y-auto pr-2">
            {products.map((product) => (
              <Fragment key={product.id}>
                <div>
                  <p className="font-semibold text-sm leading-[1.1]">
                    {/* {productName(product)} */}
                    {product.item}
                  </p>
                  <p className="leading-[1] text-neutral-500 text-xs">
                    #{product.oeCode}
                  </p>
                </div>
                <p className="text-neutral-700 text-sm leading-[1.2] font-bold pr-2 text-right">
                  {product.price.toFixed(2)} €
                </p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      {isLastStep && (
        <div className="grid grid-cols-[1fr_auto] text-xs mt-2 pb-2 border-b border-neutral-300">
          <div>
            <p className="mb-1">
              {personalInfo.name} {personalInfo.surname}
            </p>
            <p>{deliveryAddress.country}</p>
            <p>
              {deliveryAddress.city} ({deliveryAddress.province}),{" "}
              {deliveryAddress.zip}
            </p>
            <p>
              {deliveryAddress.street} {deliveryAddress.number}
            </p>
            <p className="mt-1">{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
          </div>
          <div>
            <Image className="opacity-60" src={iconPackage} alt="" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-1 mt-2 pr-2">
        <p className="font-medium text-sm leading-[1.1]">total</p>
        <p className="text-neutral-700 text-sm leading-[1.2] font-bold text-right">
          {products.reduce((p, c) => p + c.price, 0).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}

function Breadcrumbs({ wizStep, changeWizStep }) {
  const breadcrumbs = [
    "personal informations",
    "delivery",
    // "billing",
    "checkout",
  ];
  return (
    <div>
      <a href="/" className="sm:hidden underline text-dark text-sm">
        back to shop
      </a>
      <div className="sm:hidden h-4"></div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex flex-wrap gap-y-0 gap-2 text-neutral-400 text-xs sm:text-sm">
          <a href="/" className="max-sm:hidden underline text-dark">
            back to shop
          </a>
          {breadcrumbs.map((b, i) => (
            <div className="flex gap-2 " key={i}>
              <p className={twJoin(i == 0 && "max-sm:hidden")}>&gt;</p>
              <BreadcrumbStep n={i} curr={wizStep} change={changeWizStep}>
                {b}
              </BreadcrumbStep>
            </div>
          ))}
        </div>

        <Image
          className="max-sm:hidden w-12"
          alt="logo 2m2"
          src={imgLogo}></Image>
      </div>
    </div>
  );
}

function BreadcrumbStep({
  n,
  curr,
  change,
  children,
}: PropsWithChildren<{ n: number; curr: number; change: any }>) {
  return (
    <button
      className={twMerge(
        "flex items-start text-left whitespace-nowrap",
        curr == n && "text-red-500",
        curr > n && "text-dark"
      )}
      disabled={curr <= n}
      onClick={() => change(() => n)}>
      {children}
    </button>
  );
}
