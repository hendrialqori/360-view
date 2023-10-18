import React from "react";
import Recoil from 'recoil'
import { Modal } from "@/components/modal/_index";
import { cn } from "@/utils/clsx";
import { AiOutlineClose } from "react-icons/ai";
import { useCreateHostpot } from "@/api/services/hostspot";
import { useParams, useSearchParams } from "react-router-dom";
import { initialViewerCoordinate, viewerCoordinate } from "@/store/scene";
import { successToaster } from "@/components/toaster/success-toaster";
import { errorToaster } from "@/components/toaster/error-toaster";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {
  isShow: boolean;
  onClose: () => void;
}

export const ModalAddLabel = ({ isShow, onClose }: Props) => {

  const [query] = useSearchParams()

  const { idTour } = useParams()

  const idRoom = query.get('roomId')

  const { mutate: createHotspot, status: statusCreateHotspot } = useCreateHostpot()

  const viewerCoordinateAtom = Recoil.useRecoilValue(viewerCoordinate)

  const setInitialViewerCoordinateAtom =
    Recoil.useSetRecoilState(initialViewerCoordinate)

  const [labelName, setLabelName] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelName(e.target.value)
  }

  const handleCreateLabel = () => {

    if(!labelName) {
      errorToaster({ message: 'Nama label tidak boleh kosong' })
      return
    }

    createHotspot(
      {
        pitch: viewerCoordinateAtom.pitch,
        yaw: viewerCoordinateAtom.yaw,
        type: 'label',
        tour_id: String(idTour),
        room_id: String(idRoom),
        text: labelName
      },
      {
        onSuccess: (response) => {
          try {
            if (response.success) {
              successToaster({ message: 'Berhasil menambah label' })
            }
          } catch (error) {
            errorToaster({ message: 'Gagal menambah label' })

          } finally {
            onClose()
          }

        },
        onError: () => {
          errorToaster({ message: 'Gagal menambah label' })
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
    <Modal show={isShow}>
      <div className="bg-white rounded-sm px-4 w-3/12">
        <header className="flex justify-end pt-3" aria-label="modal-head">
          <button
            disabled={statusCreateHotspot === 'loading'}
            type="button"
            onClick={onClose}
          >
            <AiOutlineClose className="text-lg" />
          </button>
        </header>
        <div className="mb-5" aria-label="modal-body">
          <div className='px-3' aria-label='submit-container'>
            <div className='text-black flex flex-col gap-1'>
              <label htmlFor="room-name">Label name</label>
              <input
                id='room-name'
                type="text"
                className={cn(
                  'border-gray-300 focus:border-gray-300 focus:ring-0 px-4 text-gray-900',
                  'focus:outline-none w-full tracking-wide rounded-md',
                  'placeholder:font-medium placeholder:tracking-wide placeholder:text-gray-400',
                  'peer/search'
                )}
                value={labelName}
                onChange={handleChange}
              />
            </div>
            <button
              disabled={statusCreateHotspot === 'loading'}
              type='button'
              onClick={handleCreateLabel}
              className="bg-blue-500 relative text-white w-full px-3 py-2 rounded-md font-medium mt-4"
            >
              {statusCreateHotspot === 'loading' ? <PulseLoader color='white' size={10} /> : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}