export type Hotspot = {
  id: number;
  pitch: number;
  yaw: number;
  tour_id: string;
  room_id: string;
  room_link_id?: number
  type: 'custom' | 'info'  | 'label' // custom for move scene and info for show information
  text?: string;
  typeDev?: 'custom'
  cssClass?: string
}
