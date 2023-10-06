export type Scene = {
  id: string;
  name: string;
  image: string;
  slug: string;
  initPitch?: number;
  initYAw?: number;
  hotSpots : {
    id: string | number;
    pitch: number;
    yaw: number;
    targetSceneId?: string;
    type: 'custom' | 'info' // custom for move scene and info for show information
    text?: string;
    typeDev?: 'custom'
    cssClass?: string
  }[]
}