import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './resources'

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  },
  ns: ['home', 'product'],
  defaultNS
})

export default i18n
