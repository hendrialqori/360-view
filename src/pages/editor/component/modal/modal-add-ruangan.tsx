import React from 'react'
import * as Recoil from 'recoil'
import { scene } from '@/store/scene'
import { uuid } from '@/utils/uuid'
import { Modal } from "@/components/modal/_index"
import { AiOutlineClose } from 'react-icons/ai'
import { imageGallery } from '@/data/image-gallery'
import { cn } from '@/utils/clsx'
import { BiCheck } from 'react-icons/bi'


type Props = {
  isShow: boolean;
  onClose: () => void;
}

export const ModalAddRuangan = ({ isShow, onClose }: Props) => {

  const [sceneAtom, setSceneAtom] = Recoil.useRecoilState(scene)

  const [sceneName, setSceneName] = React.useState(() => {
    return `RUANGAN-${sceneAtom.length + 1}`
  })

  React.useEffect(() => {
    setSceneName(`RUANGAN-${sceneAtom.length + 1}`)
  }, [sceneAtom.length])

  const [imageUrl, setImageUrl] = React.useState<string | null>(null)

  const pickImageUrl = (image: string) => () => setImageUrl(image)

  const addNewScene = () => {
    setSceneAtom(prev => [
      ...prev,
      {
        id: uuid(),
        name: sceneName,
        image: imageUrl as string,
        slug: '',
        hotSpots: []
      }
    ])

    closeModal()
  }

  const closeModal = () => {
    onClose()
    setImageUrl(null)
  }

  return (
    <Modal
      show={isShow}
    >
      <div className="bg-white rounded-sm px-4 w-5/12">
        <header className="flex justify-end pt-3" aria-label="modal-head">
          <button type="button" onClick={closeModal}>
            <AiOutlineClose className="text-lg" />
          </button>
        </header>
        <div className='py-4' aria-label="modal-body">
          <div className='max-h-[330px] overflow-auto' aria-label='images-container'>
            <div className='grid grid-cols-2 gap-3 pr-2' aria-label='images-wrapper'>
              {
                imageGallery.map((image, i) => (
                  <div
                    key={i}
                    className={cn(
                      'col-span-1 cursor-pointer relative',

                    )}
                    onClick={pickImageUrl(image.url)}
                  >
                    <img
                      src={image.url}
                    />
                    {
                      imageUrl === image.url &&
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
                value={sceneName}
                onChange={(e) => setSceneName(e.target.value)}
              />
            </div>
            <button
              type='button'
              onClick={addNewScene}
              className="bg-blue-500 relative text-white w-full px-3 py-2 rounded-md font-medium mt-4"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </Modal >
  )
}