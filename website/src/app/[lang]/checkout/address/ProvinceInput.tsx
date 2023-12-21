"use client";

import useTranslation from "@/context/lang/useTranslation";
import settings from "@/settings";
import { Dispatch, useEffect, useState } from "react";
import WizInput from "../WizInput";
import WizSelect, { WizSelectItem } from "../WizSelect";
import { DeliveryAddress } from "./DeliveryAddressTab";
import { createClientSideClient } from "@/lib/client/supabase";

export default function ProvinceInput({
  address,
  setAddress,
  showErrors,
}: {
  address: DeliveryAddress;
  setAddress: Dispatch<DeliveryAddress>;
  showErrors: boolean;
}) {
  const [provinces, setProvinces] = useState<WizSelectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setloadingError] = useState(false);
  const selectValue =
    address.provinceCode && address.province
      ? {
          key: address.provinceCode,
          val: address.province,
        }
      : undefined;
  const setSelectValue = (item: WizSelectItem | undefined) =>
    setAddress({
      ...address,
      provinceCode: item?.key || undefined,
      province: item?.val || undefined,
    });

  const loadProvinces = () => setLoading(true);

  useEffect(() => {
    if (!loading) return;

    const supabase = createClientSideClient();
    supabase
      .from("province")
      .select()
      .order("name")
      .then(({ data, error }) => {
        if (error) {
          console.error("ERROR: could not fetch provinces:", error.message);
        }
        if (!data?.length) {
          setloadingError(true);
        } else {
          setProvinces(data.map((d) => ({ key: d.code, val: d.name })));
        }
        setLoading(false);
      });
  }, [loading]);

  useEffect(() => loadProvinces(), []);

  const { t } = useTranslation("page.delivery-address");

  return address?.countryCode === "IT" ? (
    <WizSelect
      items={provinces}
      value={selectValue}
      onChange={setSelectValue}
      label={t("province.label")}
      placeholder={t("province.placeholder")}
      errorMessage={
        showErrors && (!address.province || !address.provinceCode)
          ? t("eerors.required-error")
          : undefined
      }
      required={true}
      loadingError={loadingError}
      onReload={() => loadProvinces()}
      loading={loading}
    />
  ) : (
    <WizInput
      id="txt-province"
      value={address.province || ""}
      onChange={(e) =>
        setAddress({
          ...address,
          province: e.target.value,
          provinceCode: settings.ecodat.foreignProvince,
        })
      }
      label={t("province.label")}
      placeholder={t("province.placeholder")}
      type="text"
      name="province"
      errorMessage={
        showErrors && !address.province ? t("required-error") : undefined
      }
      required={true}
    />
  );
}
