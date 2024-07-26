import { defaultNS } from '@/i18n/i18n'
import resources from '@/i18n/resources'
import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)['vi']
  }
}
