import { ExtendedPurchase } from '@/@types'
import { createContext, useState } from 'react'

interface PurchaseContext {
  purchases: ExtendedPurchase[]
  setPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialPurchaseContext: PurchaseContext = {
  purchases: [],
  setPurchases: () => null
}

export const PurchaseContext = createContext<PurchaseContext>(initialPurchaseContext)

export const PurchaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchases, setPurchases] = useState(initialPurchaseContext.purchases)

  return <PurchaseContext.Provider value={{ purchases, setPurchases }}>{children}</PurchaseContext.Provider>
}
