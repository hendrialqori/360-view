import { toast } from 'react-hot-toast'

export const errorToaster = ({ message }: { message: string }) => {
  return toast.error(() => <p className="py-2">{message}</p>, {
    position: 'top-right',
    duration: 3000,
  })
}
