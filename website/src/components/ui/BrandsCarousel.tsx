import logoHyundai from "@/images/brands/logo-hyunday.svg";
import logoHonda from "@/images/brands/logo-honda.svg";
import logoFord from "@/images/brands/logo-ford.svg";
import logoKia from "@/images/brands/logo-kia.svg";
import logoBmw from "@/images/brands/logo-bmw.svg";
import logoAlfaromeo from "@/images/brands/logo-alfaromeo.svg";
import Image from "next/image";

export default function BrandsCarousel() {
  return (
    <div className="flex gap-10 justify-center items-center">
      <Image className="w-12" src={logoHonda} alt=""></Image>
      <Image className="w-12" src={logoHyundai} alt=""></Image>
      <Image className="w-12" src={logoFord} alt=""></Image>
      <Image className="w-12" src={logoBmw} alt=""></Image>
      <Image className="w-12" src={logoKia} alt=""></Image>
      <Image className="w-12" src={logoAlfaromeo} alt=""></Image>
    </div>
  );
}
