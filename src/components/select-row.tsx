import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hideAndShowVariants } from '@/utils/motion'
import { cn } from '@/utils/clsx'

type Props = {
  defaultvalue: number
  rows?: number[]
  onChange: (row: number) => void
}

const defaultRows = [10, 25, 50, 100]

export const SelectRow: React.FC<Props> = ({
  defaultvalue,
  rows = defaultRows,
  onChange,
}) => {
  const [expand, setExpand] = React.useState(false)

  const toggleExpand = () => setExpand((prev) => !prev)

  const handleSelected = (row: number) => () => {
    onChange(row)
    toggleExpand()
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleExpand}
        className={cn(
          'form-select rounded-lg w-[4rem] h-8 md:h-10 md:w-[5rem] text-gray-500 flex justify-center items-center',
          'border-gray-300 focus:border-gray-300 focus:ring-0'
        )}
      >
        {defaultvalue}
      </button>
      <AnimatePresence>
        {expand && (
          <motion.div
            className="absolute bg-white rounded-md shadow-md w-[6rem] top-14 z-10"
            aria-label="row-select-wrapper"
            variants={hideAndShowVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {rows.map((row, i) => (
              <div
                key={i}
                role="button"
                onClick={handleSelected(row)}
                tabIndex={0}
                className={cn(
                  'flex items-center justify-between px-3 py-2 text-[1.1rem]',
                  defaultvalue === row
                    ? 'bg-blue-100/50 text-black'
                    : 'text-gray-400'
                )}
              >
                <span>{row}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
