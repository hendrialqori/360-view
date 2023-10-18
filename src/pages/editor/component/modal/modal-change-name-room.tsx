import { Modal } from "@/components/modal/_index";
import { cn } from "@/utils/clsx";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import PulseLoader from "react-spinners/PulseLoader";
import { useUpdateRoom } from "@/api/services/room";
import { successToaster } from "@/components/toaster/success-toaster";
import { errorToaster } from "@/components/toaster/error-toaster";

type Props = {
  isShow: boolean;
  room: {
    id: string;
    name: string
  }
  onClose: () => void;
}

export const ModalChangeNameRoom = ({ isShow, room, onClose }: Props) => {

  const { mutate: updateRoom, status: statusUpdateRoom } = useUpdateRoom()

  const [roomName, setRoomName] = React.useState(room.name)

  React.useEffect(() => {
    setRoomName(room.name)
  }, [room.name])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length >= 17) {
      return;
    }
    setRoomName(value)
  }

  const handleUpdateRoom = () => {

    if (roomName.length === 0) {
      errorToaster({ message: 'Nama tidak boleh kosong!' })
      return
    }

    const formData = new FormData()
    formData.append('name', roomName)
    formData.append('_method', 'PUT')

    updateRoom(
      {
        room_id: room.id,
        payload: formData
      },
      {
        onSuccess: () => {
          successToaster({ message: 'Behasil update nama ruangan' })
          onClose()
        },
        onError: () => {
          errorToaster({ message: 'Gagal update nama ruangan' })
        }
      }
    )
  }

  return (
    <Modal show={isShow}>
      <div className="bg-white rounded-md px-4 w-4/12">
        <header className="flex justify-end pt-3" aria-label="modal-head">
          <button
            disabled={statusUpdateRoom === 'loading'}
            type="button"
            onClick={onClose}
          >
            <AiOutlineClose className="text-lg" />
          </button>
        </header>
        <div className="mb-5" aria-label="modal-body">
          <div className='px-3' aria-label='submit-container'>
            <div className='text-black flex flex-col gap-1'>
              <label htmlFor="room-name">Room name</label>
              <input
                id='room-name'
                type="text"
                className={cn(
                  'border-gray-300 focus:border-gray-300 focus:ring-0 px-4 text-gray-900',
                  'focus:outline-none w-full tracking-wide rounded-md',
                  'placeholder:font-medium placeholder:tracking-wide placeholder:text-gray-400',
                  'peer/search'
                )}
                value={roomName}
                onChange={handleChange}
              />
            </div>
            <button
              disabled={statusUpdateRoom === 'loading'}
              type='button'
              onClick={handleUpdateRoom}
              className="bg-blue-500 relative text-white w-full px-3 py-2 rounded-md font-medium mt-4"
            >
              {statusUpdateRoom === 'loading' ? <PulseLoader color='white' size={10} /> : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}