import React from 'react'
import { Modal } from "@/components/modal/_index"
import { AiOutlineClose } from 'react-icons/ai'
import { cn } from '@/utils/clsx'
import { BiCheck } from 'react-icons/bi'
import { useCreateRoom } from '@/api/services/room'
import { useGetImages } from '@/api/services/image'
import { useParams } from 'react-router-dom'
import { successToaster } from '@/components/toaster/success-toaster'
import { errorToaster } from '@/components/toaster/error-toaster'
import PulseLoader from 'react-spinners/PulseLoader'

type Props = {
  isShow: boolean;
  onClose: () => void;
}

const ORIGIN = import.meta.env.VITE_ORIGIN;

export const ModalAddRoom = ({ isShow, onClose }: Props) => {

  const { idTour } = useParams()

  const { data: images } = useGetImages()

  const { mutate: createRoom, status: createRoomStatus } = useCreateRoom()

  const [roomName, setRoomName] = React.useState('Ruangan')

  const [imageUrl, setImageUrl] = React.useState<string | null>(null)

  const pickImageUrl = (image: string) => () => setImageUrl(image)

  const closeModal = () => {
    onClose()
    setImageUrl(null)
  }

  const handleCreateRoom = () => {
    if (!imageUrl) {
      errorToaster({ message: 'Silahkan pilih gambar dahulu' })
      return
    }

    createRoom(
      {
        image_url: imageUrl as string,
        name: roomName,
        tour_id: String(idTour)
      },
      {
        onSuccess: () => {
          successToaster({ message: 'Behasil membuat ruangan baru' })
          setRoomName('Ruangan')
          setImageUrl(null)
          closeModal()
        },
        onError: () => {
          errorToaster({ message: 'Gagal membuat ruangan' })
        }
      }
    )
  }

  return (
    <Modal
      show={isShow}
    >
      <div className="bg-white rounded-sm px-4 w-5/12">
        <header className="flex justify-end pt-3" aria-label="modal-head">
          <button
            disabled={createRoomStatus === 'loading'}
            type="button"
            onClick={closeModal}
          >
            <AiOutlineClose className="text-lg" />
          </button>
        </header>
        <div className='py-4' aria-label="modal-body">
          <div className='max-h-[330px] overflow-auto' aria-label='images-container'>
            <div className='grid grid-cols-2 gap-3 pr-2' aria-label='images-wrapper'>
              {
                images?.data?.map((image, i) => (
                  <div
                    key={i}
                    className={cn(
                      'col-span-1 cursor-pointer relative',

                    )}
                    onClick={pickImageUrl(image.file_path as string)}
                  >
                    <img
                      src={ORIGIN + image?.thumbnail_path}
                      alt='avatar'
                      loading='lazy'
                    />
                    {
                      imageUrl === image.file_path &&
                      (
                        <div
                          className='absolute inset-0 bg-black/60 z-10 flex justify-center items-center'
                          aria-label='selected-overlay'
                        >
                          <div className='bg-white flex flex-col justify-center items-center rounded-full p-1'>
                            <BiCheck className="text-4xl text-blue-600" />
                          </div>
                        </div>
                      )
                    }

                  </div>
                ))
              }
            </div>
          </div>
          <div className='mt-3 px-3' aria-label='submit-container'>
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
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <button
              disabled={createRoomStatus === 'loading'}
              type='button'
              onClick={handleCreateRoom}
              className="bg-blue-500 relative text-white w-full px-3 py-2 rounded-md font-medium mt-4"
            >
              {createRoomStatus === 'loading' ? <PulseLoader color='white' size={10} /> : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </Modal >
  )
}