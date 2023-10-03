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