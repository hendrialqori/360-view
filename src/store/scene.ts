import { atom } from "recoil";
import { type Scene } from "@/types/scene";

export const scene = atom<Scene[]>({
  key: 'scene',
  default: []
})

export const sceneMenu = atom<'custom' | 'info' | null>({
  key: 'scene-menu',
  default: null
})



export const viewerCoordinate = atom<{ pitch: number; yaw: number }>({
  key: 'viewer-coordinate',
  default: {
    pitch: 0,
    yaw: 0
  }
})


export const initialViewerCoordinate = atom<{ pitch: number; yaw: number }>({
  key: 'initial-viewer-coordinate',
  default: {
    pitch: 0,
    yaw: 0
  }
})
