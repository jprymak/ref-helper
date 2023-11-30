import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";

import translationEN from "./src/locales/en/translation.json";
import translationPL from "./src/locales/pl/translation.json";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "pl",
    lng: "pl",
    debug: true,
    resources: {
      en: {
        translation: translationEN,
      },
      pl: {
        translation: translationPL,
      },
    },
  });

export default i18n;
