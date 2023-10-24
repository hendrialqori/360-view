import { cn } from "@/utils/clsx"

type Props = React.ComponentProps<'button'> & {
  disableHover?: boolean
}

export const Button =
  ({ children, disableHover = false, ...rest }: Props) => {
    return (
      <>
        <button
          {...rest}
          className={cn(
            "transition px-5 md:px-3 py-[.30rem] md:py-[.35rem] rounded-md",
            'text-base bg-white text-blue-600',
            'border md:border-2 border-blue-600',
            'text-sm md:text-[15px]',
            disableHover ? 'opacity-50' : 'hover:bg-blue-600 hover:text-white'
          )}
          type="button"
        >
          {children}
        </button>
      </>

    )
  }