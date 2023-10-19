import { Modal } from "@/components/modal/_index";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { type Image } from "@/types/image";
import { AiOutlineClose } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { formatBytes } from '@/utils/formatBytes';
import { useCreateTour } from '@/api/services/tour';
import { useCreateRoom } from '@/api/services/room';
import { useDeleteImage, useUpdateImage } from "@/api/services/image";
import { errorToaster } from '@/components/toaster/error-toaster';
import { successToaster } from "@/components/toaster/success-toaster";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {
  isShow: boolean;
  image: Image | null
  onClose: () => void
}

const ORIGIN = import.meta.env.VITE_ORIGIN;

const enebledSync = ['pending'] as const

export const ModalShowImage = ({ isShow, image, onClose }: Props) => {

  const { mutate: createTour, status: statusCreateTour } = useCreateTour()

  const { mutate: createRoom, status: statusCreateRoom } = useCreateRoom()

  const { mutate: updateImage, status: statusUpdateImage } = useUpdateImage()

  const { mutate: deleteImage, status: statusDeleteImage } = useDeleteImage()

  const navigate = useNavigate()

  const createRoomAction = ({ tour_id }: { tour_id: string }) => {
    createRoom({
      name: 'Ruangan',
      image_url: image?.file_path as string,
      tour_id: tour_id
    },
      {
        onSuccess: (data) => {
          navigate(`/editor/${tour_id}?roomId=${data.data.id}`)
        },
        onError: () => {
          errorToaster({ message: 'Gagal mmembuat room' })
        }
      })
  }

  const addNewScene = () => {
    createTour({ name: 'Untitled' },
      {
        onSuccess: (data) => {
          createRoomAction({ tour_id: data.data.id })
        },
        onError: () => {
          errorToaster({ message: 'Gagal mmembuat tour' })
        }
      }
    )
  }

  const handleUpdateImage = () => {

    const formData = new FormData()
    formData.append('sync_status', 'pending')
    formData.append('_method', 'PUT')

    updateImage(
      {
        image_id: String(image?.id),
        payload: formData
      },
      {
        onSuccess: () => {
          successToaster({ message: 'Success update photo' })
          onClose()
        },
        onError: () => {
          errorToaster({ message: 'Failed update photo' })
        }
      }
    )
  }

  const handleDeleteImage = () => {
    const ask = confirm('Yakin ingin menghapus gambar ?')

    if (ask) {
      deleteImage(
        {
          image_id: String(image?.id)
        },
        {
          onSuccess: () => {
            successToaster({ message: 'Berhasil menghapus gambar' })
            onClose()
          },
          onError: () => {
            errorToaster({ message: 'Gagal mengapus gambar' })
          }
        }
      )
    }

  }

  return (
    <Modal show={isShow}>
      <div className="w-[850px] bg-white rounded-md p-1">
        <header className="flex justify-end p-2" aria-label="modal-head">
          <button type="button" onClick={onClose}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </header>
        <div className="flex gap-5 px-5 pt-5 pb-9" aria-label="modal-body">
          <div className="w-8/12" aria-label="image-wrapper">
            <LazyLoadImage
              src={ORIGIN + image?.thumbnail_path}
              className="rounded-md"
              effect="blur"
              alt="360-image-preview"
            />
          </div>
          <div className="w-4/12">
            <h2 className="text-2xl font-medium">{image?.name}</h2>
            <div className="mt-2 text-[.9rem]">
              <p className="text-gray-500">create at</p>
              <p className="font-medium">{dayjs(image?.created_at).format('dddd MMM YYYY')}</p>
            </div>
            <div className="mt-2 text-[.9rem]">
              <p className="text-gray-500">size</p>
              <p className="font-medium">{formatBytes(image?.file_size as number)}</p>
            </div>
            <div className="flex justify-between mt-5 mb-0">
              <button
                onClick={handleDeleteImage}
                disabled={statusDeleteImage === 'loading'}
              >
                {
                  statusDeleteImage === 'loading'
                    ? <PulseLoader color='red' size={10} />
                    : <BsTrash className="text-2xl text-red-600" />
                }
              </button>
              {
                !enebledSync.includes(image?.sync_status as typeof enebledSync[number]) && (
                  <button
                    className="bg-[#a39b03] text-white rounded-md font-medium text-[.8rem] tracking-wide px-4"
                    onClick={handleUpdateImage}
                    disabled={statusUpdateImage === 'loading'}
                  >
                    {
                      statusUpdateImage === 'loading'
                        ? <PulseLoader color='white' size={10} />
                        : (image?.sync_status === 'success' ? 'RESYNC' : 'SYNC')
                    }
                  </button>
                )
              }

              <button
                disabled={
                  statusCreateTour === 'loading' ||
                  statusCreateRoom === 'loading'
                }
                className="bg-blue-500 relative text-white w-max px-3 py-2 rounded-md font-medium text-[.8rem] tracking-wide"
                onClick={addNewScene}
              >
                {
                  statusCreateTour === 'loading' ||
                    statusCreateRoom === 'loading' ?
                    <PulseLoader color='white' size={10} />
                    : 'CREATE TOUR'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
} 