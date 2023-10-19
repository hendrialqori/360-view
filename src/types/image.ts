export type Image = {
  id?: string
  url: string;
  name: string;
  created_at: string | number;
  size: number
  sync_status: 'local' | 'pending' | 'success' | 'changed'
  thumbnail_path?: string
  file_path?: string;
  file_size?: number;
}

