import { createPortal } from 'react-dom'
import { cn } from '@/utils/clsx'
import { motion } from 'framer-motion'

export const Wrapper: React.FC<{
  children: React.ReactNode
  theme: 'light' | 'dark'
}> =
  ({ children, theme }) => {
    return createPortal(
      <motion.div
        initial={{ opacity: 0, top: -60 }}
        animate={{ opacity: 1, top: 0 }}
        exit={{ opacity: 0, top: -60 }}
        className={cn(
          'fixed flex items-center justify-center overflow-y-hidden overflow-x-hidden',
          'inset-0 z-[99] text-[1.1rem] tracking-wide',
          theme === 'light' ? ' bg-white/70 ' : ' bg-black/25 '
        )}
      >
        {children}
      </motion.div>,
      document.body
    )
  }
