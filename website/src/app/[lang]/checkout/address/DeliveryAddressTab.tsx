import nationsJson from "@/data/nations.json";
import iconShipping from "@/images/icons/shipping.svg";
import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import WizInput from "../WizInput";
import WizSelect, { WizSelectItem } from "../WizSelect";
import WizTabValidator from "../WizTabHandle";
import CityInput from "./CityInput";
import ProvinceInput from "./ProvinceInput";
import useLogger from "@/hooks/useLogger";

export interface DeliveryAddress {
  country?: string;
  countryCode?: string;
  province?: string;
  provinceCode?: string;
  city?: string;
  istat?: string;
  zip?: string;
  street?: string;
  number?: string;
  notes?: string;
}

export interface DeliveryInfoParams {
  address: DeliveryAddress;
  setAddress: React.Dispatch<DeliveryAddress>;
}

const nations: WizSelectItem[] = nationsJson.map((n) => ({
  key: n.code,
  val: n.name,
}));

export const DeliveryAddressTab = forwardRef<
  WizTabValidator,
  DeliveryInfoParams
>(({ address, setAddress }, ref) => {
  const [showErrors, setShowErrors] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        validate: () => {
          setShowErrors(true);
          return (
            !!address.country &&
            !!address.countryCode &&
            !!address.province &&
            !!address.provinceCode &&
            !!address.city &&
            !!address.istat &&
            !!Number(address.zip || "err") &&
            !!address.street &&
            !!Number(address.number || "err") &&
            (!address.notes?.length || address.notes.length < 250)
          );
        },
        focus: () => {
          tabRef.current?.querySelector("input")?.focus();
        },
      };
    },
    [address]
  );

  useEffect(() => {
    setAddress({
      ...address,
      city: undefined,
      istat: undefined,
    });
  }, [address.countryCode, address.provinceCode]);

  useEffect(() => {
    setAddress({
      ...address,
      province: undefined,
      provinceCode: undefined,
      city: undefined,
      istat: undefined,
    });
  }, [address.countryCode]);

  useEffect(() => {
    const country = nations.find((n) => n.key === "IT");
    setAddress({
      ...address,
      countryCode: country?.key,
      country: country?.val,
    });
  }, []);

  useLogger(address, [address]);

  return (
    <div ref={tabRef} className="mb-2.5">
      <div className="flex items-start gap-2 mb-2">
        <Image className="w-5 -translate-y-px" src={iconShipping} alt="" />
        <h4 className="text-xl leading-[0.9] font-bold uppercase">
          <span className="text-red-500">Delivery</span> Address
        </h4>
      </div>

      <div className="flex flex-col gap-1">
        <WizSelect
          items={nations}
          value={
            address.countryCode && address.country
              ? {
                  key: address.countryCode,
                  val: address.country,
                }
              : undefined
          }
          onChange={(item) =>
            setAddress({ ...address, countryCode: item.key, country: item.val })
          }
          label="country"
          placeholder="Country"
          errorMessage={showErrors && !address.country ? "required" : undefined}
          required={true}
          loading={false}
          loadingError={false}
        />
        <ProvinceInput
          address={address}
          setAddress={setAddress}
          showErrors={showErrors}
        />
        <div className="grid grid-cols-3 gap-x-2">
          <div className="col-span-2">
            <CityInput
              address={address}
              setAddress={setAddress}
              showErrors={showErrors}
            />
          </div>
          <WizInput
            id="txt-zip"
            value={address.zip || ""}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            label="zip"
            placeholder="Zip"
            type="text"
            name="zip"
            errorMessage={
              showErrors
                ? !address.zip
                  ? "required"
                  : Number.isNaN(Number(address.zip || "err"))
                  ? "invalid"
                  : undefined
                : undefined
            }
            required={true}
          />
        </div>

        <div className="grid grid-cols-4 gap-x-2">
          <div className="col-span-3">
            <WizInput
              id="txt-street"
              value={address.street || ""}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              label="street"
              placeholder="Street"
              type="text"
              name="street"
              errorMessage={
                showErrors && !address.street ? "required" : undefined
              }
              required={true}
            />
          </div>
          <WizInput
            id="txt-number"
            value={address.number || ""}
            onChange={(e) => setAddress({ ...address, number: e.target.value })}
            label="n"
            placeholder="Building"
            type="text"
            name="civic"
            errorMessage={
              showErrors
                ? !address.number
                  ? "required"
                  : Number.isNaN(Number(address.number))
                  ? "invalid"
                  : undefined
                : undefined
            }
            required={true}
          />
        </div>
        <WizInput
          id="txt-notes"
          value={address.notes || ""}
          onChange={(e) => setAddress({ ...address, notes: e.target.value })}
          label="notes"
          placeholder="Write here your notes"
          type="textarea"
          name="notes"
          errorMessage={
            showErrors && address.notes && address.notes.length > 250
              ? "max 250 chars"
              : undefined
          }
        />
      </div>
    </div>
  );
});
