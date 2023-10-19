import { cn } from "@/utils/clsx"

type Props = {
  status: 'local' | 'pending' | 'success' | 'changed'
}

const statusColor = {
  local: 'bg-blue-500 px-7',
  pending: 'bg-yellow-500 px-5',
  success: 'bg-green-600 px-5',
  changed: 'bg-gray-500 px-[1rem]'
}

export const Badge = ({ status }: Props) => {
  return (
    <div
      className={cn(
        "w-max py-[.3rem] mx-auto rounded-mdcapitalize absolute top-0 right-0 z-10",
        'text-white text-base tracking-wide',
        statusColor[status] ?? 'bg-blue-600'
      )}
      aria-label="badge"
    >
      {
        status === 'success' ? 'Synced' : status
      }
    </div>
  )
}