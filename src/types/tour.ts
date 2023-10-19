export type Tour = {
  id: string;
  client_id?: string
  name: string;
  sync_status: 'local' | 'pending' | 'success' | 'changed'
  created_at: string;
  updated_at: string;
}