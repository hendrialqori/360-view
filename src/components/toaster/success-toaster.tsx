import { toast } from 'react-hot-toast'

export const successToaster = ({ message }: { message: string }) => {
  return toast.success(() => <p className="py-2">{message}</p>, {
    position: 'top-right',
    duration: 3000,
  })
}
