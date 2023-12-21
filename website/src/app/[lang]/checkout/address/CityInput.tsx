import { Dispatch, useEffect, useState } from "react";
import WizSelect, { WizSelectItem } from "../WizSelect";
import { DeliveryAddress } from "./DeliveryAddressTab";
import { Database } from "@/database.types";
import settings from "@/settings";
import WizInput from "../WizInput";
import useTranslation from "@/context/lang/useTranslation";
import { createClientSideClient } from "@/lib/client/supabase";

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
    address.provinceCode !== settings.ecodat.foreignProvince;

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

    const supabase = createClientSideClient();
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

  const { t } = useTranslation("page.delivery-address");

  return address?.countryCode === "IT" ? (
    <WizSelect
      items={municipalities}
      value={citySelectValue}
      onChange={setCitySelectValue}
      label={t("city.label")}
      placeholder={t("city.placeholder")}
      errorMessage={
        showErrors && (!address.city || !address.istat)
          ? t("errors.required-error")
          : undefined
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
          istat: settings.ecodat.foreignIstat,
        })
      }
      label={t("city.label")}
      placeholder={t("city.placeholder")}
      type="text"
      name="city"
      errorMessage={
        showErrors && !address.city ? t("errors.required-error") : undefined
      }
      required={true}
    />
  );
}
