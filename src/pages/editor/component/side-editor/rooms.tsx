import React from "react"
import { useGetTourRooms } from "@/api/services/tour"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { IoMdAdd } from "react-icons/io"
import { PiPaperPlaneTiltFill } from "react-icons/pi"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { cn } from "@/utils/clsx"

type Panel = {
  room_id: string;
  room_name: string;
}

type Props = {
  onShowModal: () => void;
  onShowRoomPanel: (params: Panel) => (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Rooms =

  React.memo(({ onShowModal, onShowRoomPanel }: Props) => {

    const [query] = useSearchParams()

    const navigate = useNavigate()

    const { idTour } = useParams()

    const idRoom = query.get('roomId')

    const { data: rooms } = useGetTourRooms({ id: String(idTour) })

    const roomsMemoize = React.useMemo(() => {
      return rooms?.data
    }, [rooms?.data])

    const moveToTargetScene = (id: string) =>
      () => navigate(`/editor/${idTour}?roomId=${id}`)



    return (
      <section className='mt-2' aria-label='ruangan'>
        <header className='flex items-center justify-between pr-4'>
          <h3 className="text-[.85rem] font-semibold px-5 text-gray-300">RUANGAN</h3>
          <button
            className='border border-white rounded-md p-[.4rem]'
            onClick={onShowModal}
          >
            <IoMdAdd className="text-white" />
          </button>
        </header>
        <div className='max-h-[300px] overflow-auto mt-2' aria-label='list-ruangan-container'>
          <div className='text-white flex flex-col gap-[3px]' aria-label='list-ruangan-wrapper'>
            {roomsMemoize?.map((room, i) => (
              <button
                key={i}
                className={cn(
                  'flex items-center justify-between px-5 w-full py-3 relative',
                  String(idRoom) === room.id ? 'bg-gray-600' : 'bg-gray-700'
                )}
                type="button"
                onClick={moveToTargetScene(room.id as unknown as string)}
              >
                <div className='flex items-center gap-3'>
                  <PiPaperPlaneTiltFill className="text-lg" />
                  <p className=''>{room.name}</p>
                </div>
                <div
                  role='button'
                  tabIndex={0}
                  onClick={
                    onShowRoomPanel({
                      room_id: room.id,
                      room_name: room.name
                    })}
                >
                  <HiOutlineDotsVertical className="text-2xl" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    )
  })