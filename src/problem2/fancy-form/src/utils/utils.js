import { currencyIconMap } from '../constants/specialCurrency'

export const formatCurrencyName = (currency) => {
  return currencyIconMap[currency] || currency
}
