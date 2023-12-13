import { Dispatch, useEffect, useState } from "react";
import WizSelect, { WizSelectItem } from "../WizSelect";
import { DeliveryAddress } from "./DeliveryAddressTab";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/database.types";
import { ecodat } from "@/settings";
import WizInput from "../WizInput";

const citiesCache = new Map<string, WizSelectItem[]>();

export default function CityInput({
  address,
  setAddress,
  showErrors,
}: {
  address: DeliveryAddress;
  setAddress: Dispatch<DeliveryAddress>;
  showErrors: boolean;
}) {
  const supabase = createClientComponentClient<Database>();

  const [municipalities, setMunicipalities] = useState<WizSelectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setloadingError] = useState(false);
  const citySelectValue =
    address.istat && address.city
      ? {
          key: address.istat,
          val: address.city,
        }
      : undefined;
  const setCitySelectValue = (item?: WizSelectItem) =>
    setAddress({
      ...address,
      istat: item?.key,
      city: item?.val,
    });

  const canLoad =
    address?.countryCode === "IT" &&
    address.province &&
    address.provinceCode &&
    address.provinceCode !== ecodat.foreignProvince;

  const loadCities = () => {
    canLoad && setLoading(true);
  };

  useEffect(() => {
    if (!loading) return;

    if (!canLoad) {
      setLoading(false);
      return;
    }

    const provinceCode = address.provinceCode!;

    if (citiesCache.has(provinceCode)) {
      setMunicipalities(citiesCache.get(provinceCode)!);
      setLoading(false);
      return;
    }

    supabase
      .from("province")
      .select("*, municipality(*)")
      .order("name")
      .eq("code", provinceCode) // implied in canLoad
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("ERROR: could not fetch cities:", error.message);
        }
        if (!data?.municipality?.length) {
          setloadingError(true);
        } else {
          const asWizSelectItem = data.municipality.map((d) => ({
            key: String(d.istat),
            val: d.name,
          }));
          citiesCache.set(provinceCode, asWizSelectItem);
          setMunicipalities(asWizSelectItem);
        }
        setLoading(false);
      });
  }, [loading, canLoad, address.provinceCode]);

  useEffect(() => {
    canLoad && loadCities();
  }, [address.countryCode, address.province]);

  return address?.countryCode === "IT" ? (
    <WizSelect
      items={municipalities}
      value={citySelectValue}
      onChange={setCitySelectValue}
      label="city"
      placeholder="City"
      errorMessage={
        showErrors && (!address.city || !address.istat) ? "required" : undefined
      }
      required={true}
      loadingError={loadingError}
      onReload={() => loadCities()}
      loading={loading}
    />
  ) : (
    <WizInput
      id="txt-city"
      value={address.city || ""}
      onChange={(e) =>
        setAddress({
          ...address,
          city: e.target.value,
          istat: ecodat.foreignIstat,
        })
      }
      label="city"
      placeholder="City"
      type="text"
      name="city"
      errorMessage={showErrors && !address.city ? "required" : undefined}
      required={true}
    />
  );
}
