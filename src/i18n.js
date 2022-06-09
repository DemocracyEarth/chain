import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { config } from 'config';
import english from 'lang/en.json';

const resources = {
  en: {
    translation: english
  }
};

i18n
  .use(reactI18nextModule)
  .init({
    resources,
    lng: config.i18n.lng,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;