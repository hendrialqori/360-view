export type Hotspot = {
  id: string;
  pitch: number;
  yaw: number;
  tour_id: string;
  room_id: string;
  room_link_id?: string
  type: 'custom' | 'info'  | 'label' // custom for move scene and info for show information
  text?: string;
  typeDev?: 'custom'
  cssClass?: string
}
