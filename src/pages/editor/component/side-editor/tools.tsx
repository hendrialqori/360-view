import React from 'react'
import Recoil from 'recoil'
import { initialViewerCoordinate, viewerCoordinate } from '@/store/scene'
import { useCreateHostpot } from "@/api/services/hostspot"
import { useUpdateRoom } from '@/api/services/room'
import { errorToaster } from "@/components/toaster/error-toaster"
import { successToaster } from "@/components/toaster/success-toaster"
import { cn } from "@/utils/clsx"
import { FaRegEye } from "react-icons/fa"
import { HiInformationCircle } from "react-icons/hi"
import { IoIosArrowDropupCircle } from "react-icons/io"
import { BiSolidLabel } from 'react-icons/bi'
import { useParams, useSearchParams } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader";
import { ModalAddLabel } from '../modal/modal-add-label'

export const Tools = React.memo(() => {

  const [query] = useSearchParams()

  const { idTour } = useParams()

  const idRoom = query.get('roomId')

  const { mutate: createHotspot, status: statusCreateHotspot } = useCreateHostpot()

  const { mutate: updateRoom, status: statusUpdateRoom } = useUpdateRoom()

  const viewerCoordinateAtom = Recoil.useRecoilValue(viewerCoordinate)

  const [roomMenu, setRoomMenu] = React.useState<'custom' | 'info' | 'label' | null>(null)

  const [modalLabel, setModalLabel] = React.useState(false)

  const handleModalLabel = React.useCallback((type: 'open' | 'close') =>
    () => {
      if (type === 'open') return setModalLabel(true)
      if (type === 'close') return setModalLabel(false)
    }, [])

  const setInitialViewerCoordinateAtom =
    Recoil.useSetRecoilState(initialViewerCoordinate)

  const handleInitialView = () => {
    const formData = new FormData()
    formData.append('pitch', String(viewerCoordinateAtom.pitch))
    formData.append('yaw', String(viewerCoordinateAtom.yaw))
    formData.append('_method', 'PUT')

    updateRoom(
      {
        room_id: Number(idRoom),
        payload: formData
      },
      {
        onSuccess: () => {
          successToaster({ message: 'Berhasil update initial view' })
        },
        onError: () => {
          errorToaster({ message: 'Gagal update initial view' })
        }
      }
    )

  }

  const handleRoomMenuType = (type: 'custom' | 'info') =>
    () => {
      setRoomMenu(type)
      createHotspot(
        {
          pitch: viewerCoordinateAtom.pitch,
          yaw: viewerCoordinateAtom.yaw,
          type: type,
          tour_id: Number(idTour),
          room_id: Number(idRoom)
        },
        {
          onSuccess: () => {
            successToaster({ message: 'Berhasil menambah hotspot' })
            setRoomMenu(null)
          },
          onError: () => {
            errorToaster({ message: 'Gagal menambah hotspot' })
            setRoomMenu(null)
          }
        }
      )
      // set pannellum view coordinate
      setInitialViewerCoordinateAtom({
        pitch: viewerCoordinateAtom.pitch,
        yaw: viewerCoordinateAtom.yaw
      })


    }


  return (
    <>
      <section className="text-white py-1" aria-label="tools">
        <h3 className="text-[.85rem] font-semibold px-5 text-gray-300">TOOLS</h3>
        <div className='mt-2 flex flex-col gap-[3px]' aria-label="btn-action-contianer">
          <button
            className={cn(
              'flex items-center gap-3 px-5 w-full py-[10px]',
              'bg-gray-700 hover:bg-gray-600 transition'
            )}
            type="button"
            onClick={handleRoomMenuType('info')}
            disabled={statusCreateHotspot === 'loading'}
          >
            {
              statusCreateHotspot === 'loading'
                && roomMenu === 'info'
                ? <PulseLoader color='white' size={10} className='mx-auto py-[5px]' />
                : (
                  <>
                    <HiInformationCircle className="text-2xl" />
                    <p>Tambah Text</p>
                  </>
                )
            }
          </button>
          <button
            className={cn(
              'flex items-center gap-3 px-5 w-full py-[10px]',
              'bg-gray-700 hover:bg-gray-600 transition'
            )}
            onClick={handleModalLabel('open')}
            type="button"

          >
            <BiSolidLabel className="text-2xl" />
            <p>Tambah Label</p>
          </button>
          <button
            className={cn(
              'flex items-center gap-3 px-5 w-full py-[10px] bg-gray-700 hover:bg-gray-600 transition'
            )}
            type="button"
            onClick={handleRoomMenuType('custom')}
            disabled={statusCreateHotspot === 'loading'}
          >
            {
              statusCreateHotspot === 'loading'
                && roomMenu === 'custom'
                ? <PulseLoader color='white' size={10} className='mx-auto py-[5px]' />
                : (
                  <>
                    <IoIosArrowDropupCircle className="text-2xl" />
                    <p>Tambah Hotspot</p>
                  </>
                )
            }
          </button>
          <button
            onClick={handleInitialView}
            className='flex items-center gap-3 px-5 w-full py-[10px] bg-gray-700'
            type="button"
            disabled={statusUpdateRoom === 'loading'}
          >
            {
              statusUpdateRoom === 'loading'
                ? <PulseLoader color='white' size={10} className='mx-auto py-[5px]' />
                : (
                  <>
                    <FaRegEye className="text-2xl" />
                    <p>Tetapkan view awal</p>
                  </>
                )
            }
          </button>
        </div>
      </section >

      <ModalAddLabel
        isShow={modalLabel}
        onClose={handleModalLabel('close')}
      />
    </>
  )
})