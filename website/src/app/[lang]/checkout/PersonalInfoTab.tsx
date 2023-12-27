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
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  cf?: string;
  piva?: string;
  pec?: string;
  sdi?: string;
}

export interface PersonalInfoParams {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<PersonalInfo>;
}

export const PersonalInfoTab = forwardRef<WizTabValidator, PersonalInfoParams>(
  ({ personalInfo, setPersonalInfo }, ref) => {
    const [showErrors, setShowErrors] = useState(false);
    const tabRef = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<"private" | "business">("private");
    const [success, setSuccess] = useState(false);
    const [isChecked, setChecked] = useState(false);

    useImperativeHandle(
      ref,
      () => {
        return {
          validate: () => {
            setShowErrors(true);
            return (
              !!personalInfo.name &&
              !!personalInfo.surname &&
              !!personalInfo.email &&
              isEmail(personalInfo.email)
            );
          },
          focus: () => tabRef.current?.querySelector("input")?.focus(),
        };
      },
      [personalInfo]
    );

    const handleCheckboxChange = () => {
      setChecked(!isChecked);
    };

    const { t, r } = useTranslation("page.personal-info");
    return (
      <div ref={tabRef} className="mb-2.5">
        <div className="flex items-start gap-2 mb-2">
          <Image className="w-5 -translate-y-px" src={iconUser} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            {r("title")}
          </h4>
        </div>

        {!success && (
          <>
            <div className="grid grid-cols-2 gap-2 pt-2 pb-4">
              <button
                onClick={() => setMode("private")}
                className={twJoin(
                  "uppercase text-sm py-1 rounded border hover:bg-stone-200",
                  mode === "private"
                    ? "bg-red-gradient text-white font-medium border-transparent"
                    : "bg-stone-100"
                )}
              >
                {t("private")}
              </button>
              <button
                onClick={() => setMode("business")}
                className={twJoin(
                  "uppercase text-sm py-1 rounded border hover:bg-stone-200",
                  mode === "business"
                    ? "bg-red-gradient text-white font-medium border-transparent"
                    : "bg-stone-100"
                )}
              >
                {t("business")}
              </button>
            </div>

            {mode === "private" && (
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
                        ? t("errors.required-error")
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
                        ? t("errors.required-error")
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
                    label="cf"
                    placeholder={t("cf.placeholder")}
                    type="text"
                    name="cf"
                    errorMessage={
                      showErrors && !personalInfo.cf
                        ? t("errors.required-error")
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
                          ? t("errors.required-error")
                          : !isEmail(personalInfo.email)
                          ? t("errors.invalid-error")
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

            {mode === "business" && (
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
                          ? t("errors.required-error")
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
                      showErrors
                        ? !personalInfo.cf
                          ? t("errors.required-error")
                          : !personalInfo.cf
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
                          ? t("errors.required-error")
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
                          ? t("errors.required-error")
                          : !isEmail(personalInfo.email)
                          ? t("errors.invalid-error")
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

                  <div className="flex flex-col gap-y-2 ">
                    <div className="flex gap-3 mt-2 items-center">
                      <label className="text-xs">
                        {t("business-info.electronic-invoice")}
                      </label>
                      <input
                        className=""
                        type="checkbox"
                        name="nomeCheckbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </div>

                    <div>
                      {isChecked ? (
                        <div className="flex flex-col gap-1">
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
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
);
