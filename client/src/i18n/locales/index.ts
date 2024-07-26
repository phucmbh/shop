import HOME_VI from './vi/home.json'
import HOME_EN from './en/home.json'
import PRODUCT_VI from './vi/product.json'
import PRODUCT_EN from './en/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const EN = {
  HOME: HOME_EN,
  PRODUCT: PRODUCT_EN
} as const

export const VI = {
  HOME: HOME_VI,
  PRODUCT: PRODUCT_VI
} as const
