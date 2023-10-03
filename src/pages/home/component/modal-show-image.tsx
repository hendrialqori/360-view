import * as Recoil from 'recoil'
import { scene } from '@/store/scene';
import { Modal } from "@/components/modal/_index";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { type Image } from "@/types/image";
import { AiOutlineClose } from 'react-icons/ai'
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { uuid } from '@/utils/uuid';

type Props = {
  isShow: boolean;
  image: Image | null
  onClose: () => void
}

export const ModalShowImage = ({ isShow, image, onClose }: Props) => {

  const navigate = useNavigate()

  const [sceneAtom, setSceneAtom] = Recoil.useRecoilState(scene)

  const addNewScene = () => {
    setSceneAtom(prev => [
      ...prev,
      {
        id: uuid(),
        name: `RUANGAN-${sceneAtom.length + 1}`,
        image: image?.url as string,
        slug: '',
        hotSpots: []
      }
    ])

    navigate('/editor')
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
              src={image?.url}
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
              <p className="font-medium">{image?.size} MB</p>
            </div>
            <div className="flex justify-end mt-auto mb-0">
              <button
                className="bg-blue-500 relative text-white w-max px-3 py-2 rounded-md font-medium"
                onClick={addNewScene}
              >
                Create tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
} 