import React from 'react'
import { Layout } from "@/components/layout/_index";
import { useGetTourRooms } from "@/api/services/tour";
import { useGetRoomHotspots } from "@/api/services/room";

/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Pannellum } from "pannellum-react";
import { useParams } from "react-router-dom";


const ORIGIN = import.meta.env.VITE_ORIGIN;

export default function Tour() {

  const [roomId, setRoomId] = React.useState<number | null>(null)

  const { idTour } = useParams()

  const { data: rooms, status: statusRoom } = useGetTourRooms({ id: Number(idTour) })

  React.useEffect(() => {
    if (rooms?.data.length) {
      setRoomId(rooms?.data[0].id)
    }
  }, [rooms?.data])

  const currentRoom = React.useMemo(() => {

    const initialRoom = rooms?.data[0]

    const roomById = rooms?.data.find((room) => room.id === roomId)

    return roomId ? roomById : initialRoom
  }, [roomId, rooms?.data])

  const { data: hostspots } = useGetRoomHotspots({ id: String(roomId) })

  const moveRoom = ({ room_id }: { room_id: number }) =>
    () => setRoomId(room_id)

  return (
    <Layout>
      <Pannellum
        title={currentRoom?.name}
        width="100%"
        height="93vh"
        image={statusRoom === 'success' ? ORIGIN + currentRoom?.image_url : ''}
        // image={'/images/5.jpeg'}
        autoLoad={true}
        hfov={100}
        haov={360}
        vaov={180}
        pitch={0}
        yaw={0}
      >
        {hostspots?.data?.map((hotspot, i) => (
          hotspot.type === 'info' ? (
            <Pannellum.Hotspot
              key={i}
              type={'info'}
              pitch={hotspot?.pitch}
              yaw={hotspot?.yaw}
              text={hotspot.text}
            />
          ) :
            hotspot.type === 'custom' ? (
              <Pannellum.Hotspot
                key={i}
                type={'custom'}
                pitch={hotspot?.pitch}
                yaw={hotspot?.yaw}
                handleClick={moveRoom({ room_id: Number(hotspot.room_link_id) })}
              />
            )
              : null
        ))}
      </Pannellum>
    </Layout>

  )
}