"use server";
import getSession from "@/api/getSession";

const dictionaries = {
  en: () => import("./locales/en.json").then((module) => module.default),
  fr: () => import("./locales/fr.json").then((module) => module.default),
};

export default async function getTranslation(locale: "en" | "fr") {
  let default_language: "en" | "fr" = "en";
  default_language = default_language ?? locale;
  const lang = await dictionaries?.[default_language]?.();
  return { lang, default_language };
}
