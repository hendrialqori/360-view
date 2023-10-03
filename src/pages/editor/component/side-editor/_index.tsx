import React from 'react'
import * as Recoil from 'recoil'
import { useNavigate } from 'react-router-dom'
import { scene, sceneMenu } from '@/store/scene'
import { HiInformationCircle } from 'react-icons/hi'
import { IoIosArrowDropupCircle, IoMdAdd } from 'react-icons/io'
import { FaRegEye } from 'react-icons/fa'
import { PiPaperPlaneTiltFill } from 'react-icons/pi'
import { cn } from '@/utils/clsx'
import { ModalAddRuangan } from '../modal/modal-add-ruangan'

const modalState = {
  addRuangan: false
}

export const SideEditor = () => {

  React.useEffect(() => {
    // reset pathname
    navigate('/editor')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  const [tourName, setTourName] = React.useState('untitled')

  const [modal, setModal] = React.useState<typeof modalState>(modalState)

  const sceneAtom = Recoil.useRecoilValue(scene)

  const [sceneMenuAtom, setSceneMenuAtom] = Recoil.useRecoilState(sceneMenu)

  console.log(sceneMenuAtom)

  const moveToTargetScene = (id: string) =>
    () => navigate(`/editor/?sceneId=${id}`)

  const handleShowModal = React.useCallback((type: keyof typeof modalState) =>
    () => {
      switch (type) {
        case 'addRuangan':
          setModal({ addRuangan: true })
          break
      }
    }
    , [])

  const handleSceneMenuType = (type: 'custom' | 'info') =>
    () => {
      setSceneMenuAtom(type)
    }

  const onCloseModal = React.useCallback(() => setModal(modalState), [])

  return (
    <>
      <div className={cn(
        "col-span-2 bg-gray-800 pt-2 pb-5",
        "min-h-[calc(100vh_-_60px)] flex flex-col justify-between"
      )}
      >
        <div>
          <section className="text-white py-1" aria-label="tools">
            <h3 className="text-[.85rem] font-semibold px-5 text-gray-300">TOOLS</h3>
            <div className='mt-2 flex flex-col gap-[3px]' aria-label="btn-action-contianer">
              <button
                className={cn(
                  'flex items-center gap-3 px-5 w-full py-[10px]',
                  sceneMenuAtom === 'info' ? ' bg-gray-500' : ' bg-gray-700'

                )}
                type="button"
                onClick={handleSceneMenuType('info')}
              >
                <HiInformationCircle className="text-2xl" />
                <p>Tambah Text</p>
              </button>
              <button
                className={cn(
                  'flex items-center gap-3 px-5 w-full py-[10px] bg-gray-700',
                  sceneMenuAtom === 'custom' ? ' bg-gray-500' : ' bg-gray-700'
                )}
                type="button"
                onClick={handleSceneMenuType('custom')}
              >
                <IoIosArrowDropupCircle className="text-2xl" />
                <p>Tambah Hotspot</p>
              </button>
              <button
                className='flex items-center gap-3 px-5 w-full py-[10px] bg-gray-700'
                type="button"
              >
                <FaRegEye className="text-2xl" />
                <p>Tetapkan view awal</p>
              </button>
            </div>
          </section>
          <section className='mt-2' aria-label='ruangan'>
            <header className='flex items-center justify-between pr-4'>
              <h3 className="text-[.85rem] font-semibold px-5 text-gray-300">RUANGAN</h3>
              <button
                className='border border-white rounded-md p-[.4rem]'
                onClick={handleShowModal('addRuangan')}
              >
                <IoMdAdd className="text-white" />
              </button>
            </header>
            <div className='max-h-[300px] overflow-auto mt-2' aria-label='list-ruangan-container'>
              <div className='text-white flex flex-col gap-[3px]' aria-label='list-ruangan-wrapper'>
                {sceneAtom?.map((scene, i) => (
                  <button
                    key={i}
                    className='flex items-center gap-3 px-5 w-full py-3 bg-gray-700'
                    type="button"
                    onClick={moveToTargetScene(scene.id)}
                  >
                    <PiPaperPlaneTiltFill className="text-xl" />
                    <p className='text-[.85rem]'>{scene.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
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
            className="bg-blue-500 relative text-white w-full px-3 py-2 rounded-md font-medium mt-4"
          >
            Simpan
          </button>
        </div>
      </div>

      <ModalAddRuangan
        isShow={modal.addRuangan}
        onClose={onCloseModal}
      />
    </>
  )
}