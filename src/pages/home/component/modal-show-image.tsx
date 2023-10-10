import { Modal } from "@/components/modal/_index";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { type Image } from "@/types/image";
import { AiOutlineClose } from 'react-icons/ai'
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { formatBytes } from '@/utils/formatBytes';
import { useCreateTour } from '@/api/services/tour';
import { useCreateRoom } from '@/api/services/room';
import { errorToaster } from '@/components/toaster/error-toaster';

type Props = {
  isShow: boolean;
  image: Image | null
  onClose: () => void
}

const ORIGIN = import.meta.env.VITE_ORIGIN;

export const ModalShowImage = ({ isShow, image, onClose }: Props) => {

  const { mutate: createTour, status: statusCreateTour } = useCreateTour()

  const { mutate: createRoom, status: statusCreateRoom } = useCreateRoom()

  const navigate = useNavigate()

  const createRoomAction = ({ tour_id }: { tour_id: number }) => {
    
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

  return (
    <Modal show={isShow}>
      <div className="w-7/12 bg-white rounded-md p-1">
        <header className="flex justify-end p-2" aria-label="modal-head">
          <button type="button" onClick={onClose}>
            <AiOutlineClose className="text-2xl" />
          </button>
        </header>
        <div className="flex gap-3 px-5 pt-5 pb-9" aria-label="modal-body">
          <div className="w-8/12" aria-label="image-wrapper">
            <LazyLoadImage
              src={ORIGIN + image?.file_path}
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
            <div className="flex justify-end mt-auto mb-0">
              <button
                className="bg-blue-500 relative text-white w-max px-3 py-2 rounded-md font-medium text-[.8rem] tracking-wide"
                onClick={addNewScene}
              >
                {
                  statusCreateTour === 'loading' ||
                    statusCreateRoom === 'loading' ? 'Loading..' : 'CREATE TOUR'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
} 