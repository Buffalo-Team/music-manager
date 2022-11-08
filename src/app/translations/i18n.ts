import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import pl from './pl';

export const supportedLanguages = ['en-US', 'pl'];

i18n.use(initReactI18next).init({
    resources: {
        'en-US': {
            translation: {
                ...en,
            },
        },
        pl: {
            translation: {
                ...pl,
            },
        },
    },
    lng: 'en-US',
    fallbackLng: 'en-US',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
