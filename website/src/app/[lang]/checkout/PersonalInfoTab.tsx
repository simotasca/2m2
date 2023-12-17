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

export interface PersonalInfo {
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
  cf?: string;
}

export interface PersonalInfoParams {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<PersonalInfo>;
}

export const PersonalInfoTab = forwardRef<WizTabValidator, PersonalInfoParams>(
  ({ personalInfo, setPersonalInfo }, ref) => {
    const [showErrors, setShowErrors] = useState(false);
    const tabRef = useRef<HTMLDivElement>(null);

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
    const { t, r } = useTranslation("page.personal-info");
    return (
      <div ref={tabRef} className="mb-2.5">
        <div className="flex items-start gap-2 mb-2">
          <Image className="w-5 -translate-y-px" src={iconUser} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            {r("title")}
          </h4>
        </div>

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
              setPersonalInfo({ ...personalInfo, surname: e.target.value })
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
              setPersonalInfo({ ...personalInfo, email: e.target.value })
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
              setPersonalInfo({ ...personalInfo, phone: e.target.value })
            }
            label={t("telephone.label")}
            placeholder={t("telephone.placeholder")}
            type="text"
            name="phone"
          />
        </div>
      </div>
    );
  }
);
