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
    () => {
      if (!room_id) return;

      setRoomId(room_id)
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCustoHotspot = (hotSpotDiv: HTMLDivElement, args: any) => {

    console.log('this func re-render!', args)

    hotSpotDiv.classList.add('custom-tooltip');
    const span = document.createElement('span');
    span.innerHTML = args.label;
    hotSpotDiv.appendChild(span);
    span.style.width = span.scrollWidth - 20 + 'px';
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.marginTop = -span.scrollHeight - 12 + 'px';

    // span.addEventListener('click', () => { alert(args.label) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

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
        pitch={currentRoom?.pitch ?? 0}
        yaw={currentRoom?.yaw ?? 0}
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
            (
              <Pannellum.Hotspot
                key={i}
                type={'custom'}
                pitch={hotspot?.pitch}
                yaw={hotspot?.yaw}
                tooltip={hotspot?.type === 'label' && handleCustoHotspot}
                tooltipArg={{ label: hotspot?.text }}
                cssClass={hotspot?.type === 'label' && 'label-custom-style'}
                handleClick={moveRoom({ room_id: Number(hotspot.room_link_id) })}
              />
            )
        ))}
      </Pannellum>
    </Layout>

  )
}