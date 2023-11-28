import iconShipping from "@/images/icons/shipping.svg";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import WizTabValidator from "./WizTabHandle";
import WizInput from "./WizInput";

export interface DeliveryAddress {
  country?: string;
  province?: string;
  city?: string;
  zip?: string;
  street?: string;
  number?: string;
}

export interface DeliveryInfoParams {
  address: DeliveryAddress;
  setAddress: React.Dispatch<DeliveryAddress>;
}

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
            !!address.province &&
            !!address.city &&
            !!Number(address.zip || "err") &&
            !!address.street &&
            !!Number(address.number || "err")
          );
        },
        focus: () => {
          tabRef.current?.querySelector("input")?.focus();
        },
      };
    },
    [address]
  );
  return (
    <div ref={tabRef} className="mb-2.5">
      <div className="flex items-start gap-2 mb-2">
        <Image className="w-5 -translate-y-px" src={iconShipping} alt="" />
        <h4 className="text-xl leading-[0.9] font-bold uppercase">
          <span className="text-red-500">Delivery</span> Address
        </h4>
      </div>

      <div className="flex flex-col gap-1">
        <WizInput
          value={address.country || ""}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          label="country"
          placeholder="Country"
          type="text"
          name="country"
          errorMessage={showErrors && !address.country ? "required" : undefined}
          required={true}
        />
        <WizInput
          value={address.province || ""}
          onChange={(e) => setAddress({ ...address, province: e.target.value })}
          label="province"
          placeholder="Province"
          type="text"
          name="province"
          errorMessage={
            showErrors && !address.province ? "required" : undefined
          }
          required={true}
        />
        <div className="grid grid-cols-3 gap-x-2">
          <div className="col-span-2">
            <WizInput
              value={address.city || ""}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              label="city"
              placeholder="City"
              type="text"
              name="city"
              errorMessage={
                showErrors && !address.city ? "required" : undefined
              }
              required={true}
            />
          </div>
          <WizInput
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
      </div>
    </div>
  );
});
