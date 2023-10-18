import { useClickOutside } from "@/hooks/use-click-outside";
import React from "react";
import { GrFormClose } from 'react-icons/gr'
import { HiOutlinePencil } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { useDeleteRoom } from "@/api/services/room";
import { useNavigate } from "react-router-dom";
import { errorToaster } from "@/components/toaster/error-toaster";
import { successToaster } from "@/components/toaster/success-toaster";
import PulseLoader from "react-spinners/PulseLoader";
import { ModalChangeNameRoom } from "./modal-change-name-room";

type Props = {
  tourId: string;
  roomId: string
  roomName: string;
  coordinateX: number;
  coordinateY: number;
  onClose: () => void
}

export const ModalPanelRoom =
  ({ tourId, roomId, roomName, coordinateX, coordinateY, onClose }: Props) => {

    const containerRef = React.useRef<HTMLDivElement | null>(null)

    const navigate = useNavigate()
    
    const [isShowModalChangeName, setIsShowModalChangeName] = React.useState(false)
    
    const { mutate: deleteRoom, status: statusDeleteRoom } = useDeleteRoom()
    
    const handleModalChangeNameRoom = (type: 'show' | 'close') =>
    () => {
      if (type === 'show') {
        setIsShowModalChangeName(true)
        return
        }
        
        if (type === 'close') {
          setIsShowModalChangeName(false)
        }
      }

    const handleDeleteRoom = () => {

      const ask = confirm('Yakin ingin menghapus ruangan ini ?')

      if (ask) {
        deleteRoom(
          {
            room_id: roomId
          },
          {
            onSuccess: () => {
              successToaster({ message: 'Berhasil menghapus ruangan' })
              navigate(`/editor/${tourId}`)
              onClose()
            },
            onError: () => {
              errorToaster({ message: 'Gagal menghapus ruangan' })
            }
          }
          )
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      useClickOutside(containerRef, !isShowModalChangeName ? onClose : () => { })
      
      return (
        <>
        <div
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            zIndex: '49',
            left: coordinateX + 10,
            top: coordinateY + 10
          }}
          className="bg-gray-100 rounded-md w-max shadow-md relative"
        >
          <button
            type="button"
            className="absolute -top-4 -right-4 bg-gray-100 shadow-lg rounded-md"
            onClick={onClose}
          >
            <GrFormClose className="text-2xl" />
          </button>
          <div className="rounded-md overflow-hidden p-1 flex flex-col" aria-label="panel-body">
            <button
              type="button"
              className="py-3 px-3 hover:bg-gray-200 transition rounded-md"
              onClick={handleModalChangeNameRoom('show')}
            >
              <div className="flex justify-start items-center gap-3">
                <HiOutlinePencil />
                <p>Ubah nama Ruangan</p>
              </div>
            </button>
            <button
              onClick={handleDeleteRoom}
              disabled={statusDeleteRoom === 'loading'}
              type="button"
              className="py-3 px-3 hover:bg-gray-200 transition rounded-md"
            >
              {
                statusDeleteRoom === 'loading'
                  ? <PulseLoader color='skyblue' size={10} />
                  : (
                    <div className="flex justify-start items-center gap-3">
                      <BsTrash />
                      <p>Hapus Ruangan</p>
                    </div>
                  )
              }
            </button>
          </div>
        </div>

        <ModalChangeNameRoom
          isShow={isShowModalChangeName}
          room={{
            id: roomId,
            name: roomName
          }}
          onClose={handleModalChangeNameRoom('close')}
        />
      </>
    )
  }