/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useUpdateHotspot, useDeleteHotspot } from '@/api/services/hostspot';
import { successToaster } from '@/components/toaster/success-toaster';
import { errorToaster } from '@/components/toaster/error-toaster';
import { type Hotspot } from '@/types/hotspot';
import ClipLoader from 'react-spinners/ClipLoader'


type Props = {
  hotspot: Hotspot
  coordinateX: number;
  coordinateY: number;
  forceRenderPanorana: () => void
  onClose: () => void
}

export const ModalInfo = ({ hotspot, coordinateX, coordinateY, forceRenderPanorana, onClose }: Props) => {

  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const { mutate: updateHostpot, status: updateStatus } = useUpdateHotspot()

  const { mutate: deleteHotspot, status: deleteStatus } = useDeleteHotspot()

  const [information, setInformation] = React.useState(hotspot?.text ?? '')

  React.useEffect(() => {
    setInformation(hotspot?.text as string ?? '')
  }, [hotspot?.text])


  const handleUpdateHotspot = () => {

    const formData = new FormData()
    formData.append('text', information as string)
    formData.append('_method', 'PUT')

    updateHostpot({
      hostpot_id: Number(hotspot.id),
      payload: formData
    },
      {
        onSuccess: () => {
          successToaster({ message: 'Berhasil update hotspot' })
          onClose()
        },
        onError: () => {
          errorToaster({ message: 'Gagal update hotspot' })
          onClose()
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
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          zIndex: '1000',
          left: coordinateX + 30,
          top: coordinateY + 10
        }}
        className="bg-white/90 rounded-md p-3"
      >
        <div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="information-text" className='font-medium'>Information text</label>
            <input
              id='information-text'
              type="text"
              className='rounded-md'
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </div>
          <div className='mt-2 flex items-center justify-between'>
            <div>
              {(updateStatus === 'loading' || deleteStatus === 'loading') && (
                <ClipLoader size={16} />
              )}
            </div>
            <div className='flex justify-center items-center gap-x-3'>
              <button
                disabled={updateStatus === 'loading'}
                type='button'
                onClick={handleUpdateHotspot}
              >
                Save
              </button>
              <button
                disabled={deleteStatus === 'loading'}
                onClick={handleDeleteHotspot}
                type='button'
                className='w-max'
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