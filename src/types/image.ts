export type Image = {
  id?: string
  url: string;
  name: string;
  created_at: string | number;
  size: number
  
  thumbnail_path?: string
  file_path?: string;
  file_size?: number;
}

