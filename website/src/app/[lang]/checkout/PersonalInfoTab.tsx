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

    return (
      <div ref={tabRef} className="mb-2.5">
        <div className="flex items-start gap-2 mb-2">
          <Image className="w-5 -translate-y-px" src={iconUser} alt="" />
          <h4 className="text-xl leading-[0.9] font-bold uppercase">
            Personal <span className="text-red-500">Informations</span>
          </h4>
        </div>

        <div className="flex flex-col gap-1">
          <WizInput
            id="txt-name"
            value={personalInfo.name || ""}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, name: e.target.value })
            }
            label="name"
            placeholder="Name"
            type="text"
            name="name"
            errorMessage={
              showErrors && !personalInfo.name ? "required" : undefined
            }
            required={true}
          />
          <WizInput
            id="txt-surname"
            value={personalInfo.surname || ""}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, surname: e.target.value })
            }
            label="surname"
            placeholder="Surname"
            type="text"
            name="surname"
            errorMessage={
              showErrors && !personalInfo.surname ? "required" : undefined
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
            placeholder="tax id."
            type="text"
            name="cf"
            errorMessage={
              showErrors && !personalInfo.cf ? "required" : undefined
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
                  ? "required"
                  : !isEmail(personalInfo.email)
                  ? "invalid email"
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
            label="phone"
            placeholder="Phone"
            type="text"
            name="phone"
          />
        </div>
      </div>
    );
  }
);
