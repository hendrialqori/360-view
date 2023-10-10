/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import * as Recoil from 'recoil'
import { viewerCoordinate, initialViewerCoordinate } from '@/store/scene';
import { useSearchParams } from 'react-router-dom';
import { ModalInfo } from '../modal/modal.info';

/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Pannellum } from "pannellum-react";
import { ModalCustom } from '../modal/modal-custom';
import { useGetRoom, useGetRoomHotspots } from '@/api/services/room';
import { Hotspot } from '@/types/hotspot';

const ORIGIN = import.meta.env.VITE_ORIGIN;

export const RoomEditor = () => {

  const [query] = useSearchParams()

  const { data: room, status: statusRoom } = useGetRoom({ id: String(query.get('roomId')) })

  const { data: hostspots } = useGetRoomHotspots({ id: String(query.get('roomId')) })

  const panoramaRef = React.useRef<any | null>(null);

  const initialViewerCoordinateAtom = Recoil.useRecoilValue(initialViewerCoordinate)

  const setViewerCoordinatAtom = Recoil.useSetRecoilState(viewerCoordinate)

  const [modal, setModal] = React.useState<'custom' | 'info' | null>(null)

  const [hotspotId, setHotspotId] = React.useState<string | null>(null)

  const [pointer, setPointer] = React.useState({
    x: 0,
    y: 0
  })

  const currentScene = React.useMemo(() => {
    const temp = room?.data

    return temp
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.data, query.get('roomId')])

  const currentHotspot = React.useMemo(() => {
    const temp = hostspots?.data.find((hotspot) =>
      hotspot.id === Number(hotspotId)
    )

    return temp
  }, [hostspots?.data, hotspotId])

  const handleShowModal = ({ type, id }:
    { type: typeof modal; id: string }) =>
    () => {
      setModal(type)
      setHotspotId(id)

    }

  const handleCloseModal = React.useCallback(() => {
    setModal(null)
    setHotspotId(null)
    

  }, [])


  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()

    setPointer({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const handleSubscribe = () => {
    const pitch = panoramaRef?.current?.getViewer()?.getPitch()
    const yaw = panoramaRef?.current?.getViewer()?.getYaw()
    setViewerCoordinatAtom({ pitch, yaw })
  }


  return (
    <div
      className="col-span-10 h-[calc(100vh_-_60px)] overflow-scroll relative"
      onClick={handleMouseDown}
    >
      <Pannellum
        ref={panoramaRef}
        title={currentScene?.name}
        width="100%"
        height="90vh"
        image={statusRoom === 'success' ? ORIGIN + currentScene?.image_url : ''}
        // image={'/images/5.jpeg'}
        autoLoad={true}
        hfov={100}
        haov={360}
        vaov={180}
        pitch={initialViewerCoordinateAtom.pitch ?? currentScene?.pitch}
        yaw={initialViewerCoordinateAtom.yaw ?? currentScene?.yaw}
        // event
        hotspotDebug={true}
        // onMousedown={handleMouseDown}
        onRender={handleSubscribe}
      >
        {hostspots?.data.map((hotspot, i) => (
          <Pannellum.Hotspot
            key={i}
            type={'custom'}
            pitch={hotspot?.pitch}
            yaw={hotspot?.yaw}
            autoRotate={0}
            cssClass={hotspot.type == 'info' ? 'info-custom-style' : ''}
            handleClick={handleShowModal({
              id: String(hotspot?.id),
              type: hotspot?.type
            })}
          />
        ))}
      </Pannellum>

      {modal === 'info' && hotspotId && (
        <ModalInfo
          hotspot={currentHotspot as Hotspot}
          coordinateX={pointer.x}
          coordinateY={pointer.y}
          forceRenderPanorana={() => panoramaRef.current.forceRender()}
          onClose={handleCloseModal}
        />
      )}

      {modal === 'custom' && hotspotId && (
        <ModalCustom
          hotspot={currentHotspot as Hotspot}
          coordinateX={pointer.x}
          coordinateY={pointer.y}
          forceRenderPanorana={() => panoramaRef.current.forceRender()}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}



{/* {currentScene?.image && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div className='h-6 w-6 rounded-full bg-black/40 text-white flex justify-center items-center'>
            <p className='text-lg'>+</p>
          </div>
        </div>
      )} */}


{/* <div
// style={{
//   left: 5.959540473090278,
//   top: 
// }}
className='absolute z-[1200] h-[50px] w-[50px] bg-white rounded-md'
onMouseDown={handleMouseDownItem}
onMouseUp={handleMouseUpItem}
>

</div> */}

// <div className='absolute z-[100000000] top-0'>
//     <div className='text-[80px] text-white cursor-grab'>
//       hello gyus
//     </div>
//   </div>


{/* <div className='absolute text-[80px] z-[1000] top-0 text-white cursor-grab'>
      hello gyus
</div> */}

// const handleMouseDown = () => {
//   // console.log({
//   //   pitch: viewRef?.current?.panorama?.getPitch(),
//   //   yaw: viewRef?.current?.panorama?.getYaw()
//   // })
//   const p = viewRef?.current?.getViewer()?.mouseEventToCoords(event)[0] as number
//   const y = viewRef?.current?.getViewer()?.mouseEventToCoords(event)[1] as number
//   setViewCoordinate({
//     pitch: p,
//     yaw: y
//   })
// }