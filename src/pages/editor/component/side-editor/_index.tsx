import React from 'react'
import { useParams } from 'react-router-dom'
import { cn } from '@/utils/clsx'
import { ModalAddRoom } from '../modal/modal-add-room'
import { InputTourName } from './input-tour-name'
import { Tools } from './tools'
import { Rooms } from './rooms'
import { ModalPanelRoom } from '../modal/modal-panel-room'

const modalState = {
  addRoom: false,
}

export const SideEditor = () => {

  const { idTour } = useParams()

  const [modal, setModal] = React.useState<typeof modalState>(modalState)

  const [room, setRoom] = React.useState({
    id: null as string | null,
    name: ''
  })

  const [panelCoordinate, setPanelCoordinate] = React.useState({ x: 0, y: 0 })

  const handleShowModal = React.useCallback((type: keyof typeof modalState) =>
    () => {
      switch (type) {
        case 'addRoom':
          setModal({ addRoom: true })
          break
      }
    }
    , [])

  const handleRoomPannel = React.useCallback((
    { room_id, room_name }:
      { room_id: string; room_name: string }
  ) =>

    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      const coordinate = {
        x: e.clientX,
        y: e.clientY
      }

      setRoom({ id: room_id, name: room_name })

      setPanelCoordinate(coordinate)
    }, [])

  const handleClosePanel = () => setRoom({ id: null, name: '' })

  const onCloseModal = React.useCallback(() => setModal(modalState), [])

  return (
    <>
      <div className={cn(
        "col-span-2 bg-gray-800 pt-2 pb-5",
        "min-h-[calc(100vh_-_60px)] flex flex-col justify-between"
      )}>
        <div aria-label='top-side'>
          <Tools />
          <Rooms
            onShowModal={handleShowModal('addRoom')}
            onShowRoomPanel={handleRoomPannel}
          />
        </div>
        <InputTourName />
      </div>

      {room.id && (
        <ModalPanelRoom
          tourId={String(idTour)}
          roomId={room.id}
          roomName={room.name}
          coordinateX={panelCoordinate.x}
          coordinateY={panelCoordinate.y}
          onClose={handleClosePanel}
        />
      )}

      <ModalAddRoom
        isShow={modal.addRoom}
        onClose={onCloseModal}
      />
    </>
  )
}