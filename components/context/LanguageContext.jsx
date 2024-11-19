// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { I18n } from 'i18n-js';
// import { getLocales } from 'expo-localization';

// const translations = {
//   en: { welcome: 'Hello', name: 'Rivky' },
//   he: { welcome: 'שלום' },
// };

// const i18n = new I18n(translations);

// const deviceLocale = getLocales()[0]?.languageCode ?? 'en';
// i18n.locale = deviceLocale;

// i18n.enableFallback = true;
// i18n.locale = 'he';

// const LanguageContext = createContext();

// export const LanguageProvider = ({ children }) => {
//   const [locale, setLocale] = useState(i18n.locale);

//   useEffect(() => {
//     i18n.locale = locale;
//   }, [locale]);

//   const changeLanguage = (newLocale) => {
//     setLocale(newLocale);
//   };

//   return (
//     <LanguageContext.Provider value={{ t: i18n.t, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => useContext(LanguageContext);


import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';

// Expanded translations with more comprehensive keys
const translations = {
  en: { 
    welcome: 'Hello', 
    switchToEnglish: 'Switch to English',
    switchToHebrew: 'Switch to Hebrew'
  },
  he: { 
    welcome: 'שלום',
    switchToEnglish: 'החלף לאנגלית',
    switchToHebrew: 'החלף לעברית'
  },
};

const i18n = new I18n(translations);

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to Hebrew, can be modified based on device settings
  const [locale, setLocale] = useState('he');

  useEffect(() => {
    // Update i18n locale
    i18n.locale = locale;
    // Force RTL for Hebrew
    I18nManager.forceRTL(locale === 'he');
  }, [locale]);

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ 
      t: (key) => i18n.t(key), // Translation function
      locale, 
      changeLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);