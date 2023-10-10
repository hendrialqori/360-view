import React from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import { useGetTourRooms } from '@/api/services/tour';
import { useUpdateHotspot, useDeleteHotspot } from '@/api/services/hostspot';
import { successToaster } from '@/components/toaster/success-toaster';
import { errorToaster } from '@/components/toaster/error-toaster';
import { cn } from '@/utils/clsx';
import { type Hotspot } from '@/types/hotspot';
import ClipLoader from 'react-spinners/ClipLoader';
import { BsCheck2 } from 'react-icons/bs'

type Props = {
  hotspot: Hotspot
  coordinateX: number;
  coordinateY: number;
  forceRenderPanorana: () => void
  onClose: () => void
}

export const ModalCustom = ({ hotspot, coordinateX, coordinateY, forceRenderPanorana, onClose }: Props) => {

  const { idTour } = useParams()

  const { data: rooms } = useGetTourRooms({ id: Number(idTour) })

  const { mutate: updateHostpot, status: updateStatus } = useUpdateHotspot()

  const { mutate: deleteHotspot, status: deleteStatus } = useDeleteHotspot()

  const [isSelectRoomId, setIsSelectRoomId] = React.useState<number | null>(hotspot?.room_link_id as number ?? null)

  const handleUpdateHotspot = () => {

    const formData = new FormData()
    formData.append('room_link_id', String(isSelectRoomId))
    formData.append('_method', 'PUT')

    updateHostpot({
      hostpot_id: Number(hotspot.id),
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

  const handleDeleteHotspot = () => {

    const ask = confirm('Yakin ingin menghapus hotspot ini ?')

    if (ask) {
      deleteHotspot(
        {
          hostpot_id: hotspot.id
        },
        {
          onSuccess: () => {
            onClose()
            successToaster({ message: 'Berhasil menghapus hotspot' })
            forceRenderPanorana()
          },
          onError: () => {
            errorToaster({ message: 'Gagal menghapus hotspot' })
          }
        }
      )
    }

  }

  return (
    <>
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
                    room.id === isSelectRoomId
                      // hotspot.room_link_id === room.id
                      ? 'bg-gray-400 text-white' : '',
                  )}
                  onClick={() => {
                    setIsSelectRoomId(room.id)
                  }}
                >
                  <div className='flex justify-between items-center'>
                    <p>{room.name}</p>
                    {hotspot?.room_link_id === room.id && <BsCheck2 className="text-2xl" />}

                  </div>
                </button>
              ))}

            </div>
          </div>
          <div className='mt-2 flex justify-between items-center '>
            <div>
              {(updateStatus === 'loading' || deleteStatus === 'loading') && (
                <ClipLoader size={16} />
              )}
            </div>
            <div className='mt-2 flex justify-end items-center gap-x-4'>
              <button
                onClick={handleUpdateHotspot}
                disabled={updateStatus === 'loading'}
                type='button'
              >
                Save
              </button>
              <button
                onClick={handleDeleteHotspot}
                className='w-max'
                type='button'
                disabled={deleteStatus === 'loading'}
              >
                <BsFillTrash3Fill className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={onClose}
        className='absolute inset-0 z-[51] bg-transparent'
        aria-label='overlay'
      />
    </>
  )
}