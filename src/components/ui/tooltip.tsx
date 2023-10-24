import React from 'react'
import { cn } from '@/utils/clsx';

type Props = {
  text: string;
  children: React.ReactNode
}

type PassingProps = {
  onMouseEnter: () => void;
  onMouseLeave: () => void
}

export const Tooltip = ({ text, children }: Props) => {

  const [isShowTooltip, setIsShowTooltip] = React.useState(false)

  const handleToggleTooltip = (type: 'show' | 'hide') =>
    () => {
      if (type === 'show') return setIsShowTooltip(true)
      if (type === 'hide') return setIsShowTooltip(false)
    }

  return (
    <div className="w-max relative">
      {isShowTooltip && (
        <>
          <div
            className={cn(
              'bg-black absolute top-0 -translate-y-12 z-10 rounded-sm',
              'text-white text-[.9rem]',
              'py-[.4rem] px-4 whitespace-nowrap',
              'left-1/2 -translate-x-1/2'
            )}
          >
            {text}
          </div>
          <div
            className={cn(
              'bg-black absolute top-0 -translate-y-5 z-10 p-[.35rem] rotate-45',
              'left-1/2 -translate-x-1/2'
            )}
          />
        </>
       )}
      {
        React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<PassingProps>, {
          onMouseEnter: handleToggleTooltip('show'),
          onMouseLeave: handleToggleTooltip('hide')
        })
      }
    </div>
  )
}