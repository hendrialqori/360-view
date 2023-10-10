import { Variants } from 'framer-motion'

export const hideAndShowVariants: Variants = {
  hidden: {
    opacity: 0,
    top: 100,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    opacity: 1,
    top: 50,
    transition: {
      duration: 0.2,
    },
  },
}

export const sidebarVariants: Variants = {
  hidden: {
    x: '-100%',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.5,
    },
  },
  show: {
    x: '0%',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.5,
    },
  },
}
