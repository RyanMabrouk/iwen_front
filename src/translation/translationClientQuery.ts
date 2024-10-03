"use client";
import getLocalValues from "@/helpers/getLocalValues";
import getTranslation from "./getTranslation";

export const translationClientQuery = () => {
  let locale = getLocalValues("lang") ? getLocalValues("lang") : "en";
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
