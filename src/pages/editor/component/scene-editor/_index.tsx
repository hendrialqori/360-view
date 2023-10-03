/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import * as Recoil from 'recoil'
import { scene, viewerCoordinate, initialViewerCoordinate } from '@/store/scene';
import { useSearchParams } from 'react-router-dom';


/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Pannellum } from "pannellum-react";


export const SceneEditor = () => {

  const [query] = useSearchParams()

  const viewRef = React.useRef<any | null>(null);

  const [sceneAtom, setSceneAtom] = Recoil.useRecoilState(scene)

  const initialViewerCoordinateAtom = Recoil.useRecoilValue(initialViewerCoordinate)

  const setViewerCoordinatAtom = Recoil.useSetRecoilState(viewerCoordinate)

  const [viewCoordinate, setViewCoordinate] = React.useState({
    pitch: null as number | null,
    yaw: null as number | null
  })

  const [mouse, setMouse] = React.useState({
    x: 20,
    y: 20
  })

  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const currentScene = React.useMemo(() => {
    const temp = sceneAtom.find((scene) => scene.id === query.get('sceneId'))

    return temp
  }, [query, sceneAtom])


  const handleMouseDown = () => {
    // console.log({
    //   pitch: viewRef?.current?.panorama?.getPitch(),
    //   yaw: viewRef?.current?.panorama?.getYaw()
    // })
    const p = viewRef?.current?.getViewer()?.mouseEventToCoords(event)[0] as number
    const y = viewRef?.current?.getViewer()?.mouseEventToCoords(event)[1] as number
    setViewCoordinate({
      pitch: p,
      yaw: y
    })
  }

  const handleMouseUp = () => {
    console.log({
      pitch: viewRef?.current?.panorama?.getPitch(),
      yaw: viewRef?.current?.panorama?.getYaw()
    })
  }

  const [isDragging, setDragging] = React.useState(false)

  // const handleMouseDownItem = (e: React.MouseEvent) => {
  //   e.preventDefault()

  //   setDragging(true)

  //   setOffset({
  //     x: e.clientX - mouse.x,
  //     y: e.clientY - mouse.y,
  //   });

  // }

  // const handleMouseUpItem = () => {
  //   setDragging(false)
  // }

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX - offset.x
    const y = e.clientY - offset.y

    if (isDragging) {
      setMouse({ x, y })
    }
  }

  const handleSubscribe = () => {
    const pitch = viewRef?.current?.getViewer()?.getPitch()
    const yaw = viewRef?.current?.getViewer()?.getYaw()
    setViewerCoordinatAtom({ pitch, yaw })
  }


  return (
    <div
      className="col-span-10 h-[calc(100vh_-_60px)] overflow-scroll relative"
      onMouseMove={handleMouseMove}
    >
      {currentScene?.image && (
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
      )}
      <Pannellum
        ref={viewRef}
        width="100%"
        height="90vh"
        image={currentScene?.image}
        autoLoad={true}
        hfov={100}
        haov={360}
        vaov={180}
        pitch={initialViewerCoordinateAtom.pitch ?? 0}
        yaw={initialViewerCoordinateAtom.yaw ?? 0}
        // event

        onMouseup={handleMouseUp}
        onMousedown={handleMouseDown}
        onRender={handleSubscribe}
      >
        {currentScene?.hotSpots.map((hotspot, i) => (
          <Pannellum.Hotspot
            key={i}
            type={hotspot.type}
            text={hotspot.text}
            pitch={hotspot.pitch}
            yaw={hotspot.yaw}
          />
        ))}

      </Pannellum>
    </div>
  )
}


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