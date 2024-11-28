"use client";
import getFromLocalstorage from "@/helpers/localstorage/getFromLocalstorage";
import getTranslation from "./getTranslation";

export const translationClientQuery = () => {
  let locale = getFromLocalstorage("lang") ? getFromLocalstorage("lang") : "en";
  if (!["en", "fr"].includes(locale)) {
    locale = "fr";
  }
  return {
    queryKey: ["lang", locale],
    queryFn: async () => {
      const langRes = await getTranslation(locale as "en" | "fr");
      return langRes;
    },
  };
};
