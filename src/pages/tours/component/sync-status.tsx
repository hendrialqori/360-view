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

export const SyncStatus = ({ status }: Props) => {
  return (
    <div
      className={cn(
        "w-max py-[.3rem] rounded-md text-white mx-auto text-sm md:text-[.95rem] capitalize",
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