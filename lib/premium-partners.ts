import { ASWAR_RESIDENCES_SITE_URL } from "@/lib/site-url";

export const PREMIUM_PARTNER_LOGOS = [
  {
    src: "/partners/1.png",
    altKey: "partnerLogoSamiEngineering",
  },
  {
    src: "/partners/2.png",
    altKey: "partnerLogoSamiEnergy",
  },
  {
    src: "/partners/3.png",
    altKey: "partnerLogoGentleGiant",
  },
  {
    src: "/partners/4.png",
    altKey: "partnerLogoVoltix",
  },
  {
    src: "/partners/5.png",
    altKey: "partnerLogoAswarIntl",
    href: ASWAR_RESIDENCES_SITE_URL,
  },
] as const;
