import iconUser from "@/images/icons/user.svg";
import { isEmail } from "@/lib/shared/object";
import Image from "next/image";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import WizInput from "./WizInput";
import WizTabValidator from "./WizTabHandle";
import useTranslation from "@/context/lang/useTranslation";
import { twJoin } from "tailwind-merge";

export interface PersonalInfo {
  type: "private" | "business";
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  cf?: string;
  piva?: string;
  withInvoice: boolean;
  pec?: string;
  sdi?: string;
}

export interface PersonalInfoParams {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<PersonalInfo>;
}

export const PersonalInfoTab = forwardRef<WizTabValidator, PersonalInfoParams>(
  ({ personalInfo, setPersonalInfo }, ref) => {
    const { t, r } = useTranslation("page.personal-info");
    const { t: tErr } = useTranslation("errors");

    const [showErrors, setShowErrors] = useState(false);
    const tabRef = useRef<HTMLDivElement>(null);

    const isBusiness = personalInfo.type === "business";

    const electronicInvoiceError =
      personalInfo.withInvoice &&
      ((!personalInfo.pec && !personalInfo.sdi) ||
        (personalInfo.pec && !isEmail(personalInfo.pec)));

    useImperativeHandle(
      ref,
      () => {
        return {
          validate: () => {
            setShowErrors(true);
            if (isBusiness) {
              return (
                !electronicInvoiceError &&
                !!personalInfo.name &&
                !!personalInfo.cf &&
                !!personalInfo.piva &&
                !!personalInfo.email &&
                isEmail(personalInfo.email)
              );
            } else {
              return (
                !!personalInfo.name &&
                !!personalInfo.surname &&
                !!personalInfo.email &&
                isEmail(personalInfo.email)
              );
            }
          },
          focus: () => tabRef.current?.querySelector("input")?.focus(),
        };
      },
      [personalInfo]
    );

    return (
      <div ref={tabRef} className="mb-2.5">
        <div className="flex items-start gap-2 mb-2">
          <Image className="w-5 -translate-y-px" src={iconUser} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            {r("title")}
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2 pb-2">
          <button
            onClick={() =>
              setPersonalInfo({ ...personalInfo, type: "private" })
            }
            className={twJoin(
              "uppercase text-sm py-1 rounded border hover:bg-stone-200",
              !isBusiness
                ? "bg-red-gradient text-white font-medium border-transparent"
                : "bg-stone-100"
            )}>
            {t("private")}
          </button>
          <button
            onClick={() =>
              setPersonalInfo({ ...personalInfo, type: "business" })
            }
            className={twJoin(
              "uppercase text-sm py-1 rounded border hover:bg-stone-200",
              isBusiness
                ? "bg-red-gradient text-white font-medium border-transparent"
                : "bg-stone-100"
            )}>
            {t("business")}
          </button>
        </div>

        {!isBusiness && (
          <>
            <div className="flex flex-col gap-1">
              <WizInput
                id="txt-name"
                value={personalInfo.name || ""}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, name: e.target.value })
                }
                label={t("name.label")}
                placeholder={t("name.placeholder")}
                type="text"
                name="name"
                errorMessage={
                  showErrors && !personalInfo.name
                    ? tErr("required-error")
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-surname"
                value={personalInfo.surname || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    surname: e.target.value,
                  })
                }
                label={t("surname.label")}
                placeholder={t("surname.placeholder")}
                type="text"
                name="surname"
                errorMessage={
                  showErrors && !personalInfo.surname
                    ? tErr("required-error")
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-cf"
                value={personalInfo.cf || ""}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, cf: e.target.value })
                }
                label={t("cf.label")}
                placeholder={t("cf.placeholder")}
                type="text"
                name="cf"
                errorMessage={
                  showErrors && !personalInfo.cf
                    ? tErr("required-error")
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-email"
                value={personalInfo.email || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    email: e.target.value,
                  })
                }
                label="email"
                placeholder="Email"
                type="email"
                name="email"
                errorMessage={
                  showErrors
                    ? !personalInfo.email
                      ? tErr("required-error")
                      : !isEmail(personalInfo.email)
                      ? tErr("invalid-error")
                      : undefined
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-phone"
                value={personalInfo.phone || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    phone: e.target.value,
                  })
                }
                label={t("telephone.label")}
                placeholder={t("telephone.placeholder")}
                type="text"
                name="phone"
              />
            </div>
          </>
        )}

        {isBusiness && (
          <>
            <div className="flex flex-col gap-1">
              <WizInput
                id="txt-name"
                value={personalInfo.name || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    name: e.target.value,
                  })
                }
                label={t("business-info.name.label")}
                placeholder={t("business-info.name.placeholder")}
                type="text"
                name="business-name"
                errorMessage={
                  showErrors
                    ? !personalInfo.name
                      ? tErr("required-error")
                      : undefined
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-cf"
                value={personalInfo.cf || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    cf: e.target.value,
                  })
                }
                label={t("business-info.cf.label")}
                placeholder={t("business-info.cf.placeholder")}
                type="text"
                name="business-tax-id"
                errorMessage={
                  showErrors && !personalInfo.cf
                    ? tErr("required-error")
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-piva"
                value={personalInfo.piva || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    piva: e.target.value,
                  })
                }
                label={t("business-info.piva.label")}
                placeholder={t("business-info.piva.placeholder")}
                type="text"
                name="business-piva"
                errorMessage={
                  showErrors
                    ? !personalInfo.piva
                      ? tErr("required-error")
                      : undefined
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-email"
                value={personalInfo.email || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    email: e.target.value,
                  })
                }
                label="email"
                placeholder="Email"
                type="email"
                name="business-email"
                errorMessage={
                  showErrors
                    ? !personalInfo.email
                      ? tErr("required-error")
                      : !isEmail(personalInfo.email)
                      ? tErr("invalid-error")
                      : undefined
                    : undefined
                }
                required={true}
              />
              <WizInput
                id="txt-phone"
                value={personalInfo.phone || ""}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    phone: e.target.value,
                  })
                }
                label={t("telephone.label")}
                placeholder={t("telephone.placeholder")}
                type="text"
                name="business-phone"
              />

              <div className="flex flex-col gap-y-1">
                <label className="text-xs">
                  <div className="flex gap-2 mt-2 items-center">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      name="nomeCheckbox"
                      checked={personalInfo.withInvoice}
                      onChange={() =>
                        setPersonalInfo({
                          ...personalInfo,
                          withInvoice: !personalInfo.withInvoice,
                        })
                      }
                    />
                    <span> {t("business-info.electronic-invoice")}</span>
                  </div>
                </label>

                {showErrors && electronicInvoiceError && (
                  <p className="text-xs leading-4 text-red-400">
                    specificare SDI o PEC per la fattura elettronica
                  </p>
                )}

                <div>
                  {personalInfo.withInvoice && (
                    <div className="flex flex-col gap-1 mb-1">
                      <WizInput
                        id="txt-pec"
                        value={personalInfo.pec || ""}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            pec: e.target.value,
                          })
                        }
                        label={t("business-info.pec.label")}
                        placeholder={t("business-info.pec.placeholder")}
                        type="text"
                        name="business-pec"
                        errorMessage={
                          showErrors && electronicInvoiceError
                            ? personalInfo.pec && !isEmail(personalInfo.pec)
                              ? tErr("invalid-error")
                              : ""
                            : undefined
                        }
                      />

                      <WizInput
                        id="txt-sdi"
                        value={personalInfo.sdi || ""}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            sdi: e.target.value,
                          })
                        }
                        label={t("business-info.sdi.label")}
                        placeholder={t("business-info.sdi.placeholder")}
                        type="text"
                        name="business-sdi"
                        errorMessage={
                          showErrors && electronicInvoiceError ? "" : undefined
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);
