import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Wrapper } from './wrapper'

type Props = {
  show: boolean
  children: React.ReactNode,
  isNested?: boolean
}

export const Modal: React.FC<Props> = ({ show, children, isNested = false }) => {
  React.useEffect(() => {
    if (show && !isNested) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      if (!isNested) {
        document.body.style.overflow = 'auto'
      }

    }
  }, [isNested, show])

  return (
    <AnimatePresence>
      {show ? <Wrapper theme="dark">{children}</Wrapper> : null}
    </AnimatePresence>
  )
}
