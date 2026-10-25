'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

const IntroContext = createContext<{ ready: boolean; setReady: (v: boolean) => void }>({
  ready: false,
  setReady: () => {},
})

/** `ready` flips to true when the preloader has finished (or was skipped). */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const value = useMemo(() => ({ ready, setReady }), [ready])
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export const useIntro = () => useContext(IntroContext)
