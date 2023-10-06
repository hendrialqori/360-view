import React from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import { useGetTourRooms } from '@/api/services/tour';
import { useUpdateHotspot } from '@/api/services/hostspot';
import { successToaster } from '@/components/toaster/success-toaster';
import { errorToaster } from '@/components/toaster/error-toaster';
import { cn } from '@/utils/clsx';

type Props = {
  hotspotCustomId: string | null;
  hotspotRoomTargetId: number | null
  coordinateX: number;
  coordinateY: number;
  onClose: () => void
}

export const ModalCustom = ({ hotspotCustomId, hotspotRoomTargetId, coordinateX, coordinateY, onClose }: Props) => {

  // const [query] = useSearchParams()

  const { idTour } = useParams()

  const { data: rooms } = useGetTourRooms({ id: Number(idTour) })

  const { mutate: updateHostpot } = useUpdateHotspot()

  const [isSelectRoomId, setIsSelectRoomId] = React.useState<number | null>(null)

  const handleUpdateHotspot = () => {

    const formData = new FormData()
    formData.append('room_link_id', String(isSelectRoomId))
    formData.append('_method', 'PUT')

    updateHostpot({
      hostpot_id: Number(hotspotCustomId),
      payload: formData
    },
      {
        onSuccess: () => {
          successToaster({ message: 'Berhasil update hotspot' })
          onClose()
          setIsSelectRoomId(null)
        },
        onError: () => {
          errorToaster({ message: 'Gagal update hotspot' })
          onClose()
          setIsSelectRoomId(null)
        }
      }
    )
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        zIndex: '1000',
        left: coordinateX + 30,
        top: coordinateY + 10
      }}
      className="bg-white/90 rounded-md p-3 w-3/12"
    >
      <div>
        <div>
          <p className='font-medium'>Select target room</p>
          <div className='my-3'>
            {rooms?.data.map((room, i) => (
              <button
                key={i}
                type='button'
                className={cn(
                  'bg-gray-300 transition w-full text-left px-2 py-2',
                  room.id === isSelectRoomId ? 'bg-gray-500 text-white' : '',
                  hotspotRoomTargetId === room.id ? 'bg-gray-500 text-white' : ''
                )}
                onClick={() => {
                  setIsSelectRoomId(room.id)
                }}
              >
                {room.name}
              </button>
            ))}

          </div>
        </div>
        <div className='mt-2 flex justify-end items-center gap-x-4'>
          <button
            onClick={handleUpdateHotspot}
            type='button'
          >
            Save
          </button>
          <button className='w-max'>
            <BsFillTrash3Fill className="text-xl" />
          </button>
        </div>

      </div>
    </div>
  )
}