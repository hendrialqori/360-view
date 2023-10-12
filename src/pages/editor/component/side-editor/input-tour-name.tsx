import { useGetTour, useUpdateTour } from "@/api/services/tour"
import { errorToaster } from "@/components/toaster/error-toaster"
import { successToaster } from "@/components/toaster/success-toaster"
import { cn } from "@/utils/clsx"
import React from "react"
import { useParams } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader"

export const InputTourName = React.memo(() => {

  const { idTour } = useParams()

  const { data: tour } = useGetTour({ tour_id: Number(idTour) })

  const [tourName, setTourName] = React.useState('')

  React.useEffect(() => {
    setTourName(tour?.data.name as string ?? '')
  }, [tour?.data.name])

  const { mutate: updateTour, status: updateTourStatus } = useUpdateTour()

  const handleUpdateTourName = () => {
    updateTour(
      {
        tour_id: Number(idTour),
        name: tourName
      },
      {
        onSuccess: () => {
          successToaster({ message: "Success update tour" })
        },
        onError: () => {
          errorToaster({ message: 'Failed update tour' })
        }
      }
    )
  }

  return (
    <div className='mt-3 px-3' aria-label='submit'>
      <div className='text-white'>
        <label htmlFor="tour-name" className='text-sm'>Tour name</label>
        <input
          id='tour-name'
          type="text"
          className={cn(
            'border-gray-300 focus:border-gray-300 focus:ring-0 px-4 text-gray-900',
            'focus:outline-none w-full tracking-wide rounded-md',
            'placeholder:font-medium placeholder:tracking-wide placeholder:text-gray-400',
            'peer/search'
          )}
          value={tourName}
          onChange={(e) => setTourName(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdateTourName}
        disabled={updateTourStatus === 'loading'}
        className="bg-blue-500 relative text-white w-full px-3 py-2 rounded-md font-medium mt-4"
      >
        {updateTourStatus === 'loading' ? <PulseLoader color='white' size={10} /> : 'Simpan'}
      </button>
    </div>
  )
})