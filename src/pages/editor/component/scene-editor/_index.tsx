/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import * as Recoil from 'recoil'
import { scene } from '@/store/scene';
import { useSearchParams } from 'react-router-dom';



/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { Pannellum } from "pannellum-react";

export const SceneEditor = () => {

  const [query] = useSearchParams()

  const viewRef = React.useRef<any | null>(null);

  const [sceneAtom, setSceneAtom] = Recoil.useRecoilState(scene)

  const [viewCoordinate, setViewCoordinate] = React.useState({
    pitch: null as number | null,
    yaw: null as number | null
  })

  const [isDragging, setDragging] = React.useState(false)

  console.log(viewCoordinate)

  const currentScene = React.useMemo(() => {
    const temp = sceneAtom.find((scene) => scene.id === query.get('sceneId'))

    return temp
  }, [query, sceneAtom])


  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDragging(true)
  }

  // const handleMouseMove = (event: React.MouseEvent) => { 
  //   if(isDragging){
  //     const { movementX, movementY } = event
  //   }
  // }

  // const handleMouseUp = (e: React.MouseEvent) => {
  //   setDragging(false)
  // }



  return (
    <div
      className="col-span-10 h-[calc(100vh_-_60px)] overflow-scroll relative"
      onMouseDown={handleMouseDown}
    >
      <Pannellum
        ref={viewRef}
        width="100%"
        height="100vh"
        image={currentScene?.image}
        autoLoad={true}
        hfov={100}
        haov={360}
        vaov={180}
        // event
        onMouseup={(event: any) => {
          const p = viewRef?.current?.getViewer()?.mouseEventToCoords(event)[0] as number
          const y = viewRef?.current?.getViewer()?.mouseEventToCoords(event)[1] as number
          setViewCoordinate({
            pitch: p,
            yaw: y
          })
        }}
      >
        <Pannellum.Hotspot
          type="info" // custom for move to target scene, info for information
          pitch={0.109}
          yaw={159.037}
          text="Info Hotspot Text 4"
          handleClick={() => alert(123)} // handle click hanya untuk type custom
        />
      </Pannellum>
    </div>
  )
}



{/* <div className='absolute text-[80px] z-[1000] top-0 text-white cursor-grab'>
      hello gyus
</div> */}