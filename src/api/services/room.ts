import { ErrorResponse, SuccessResponse } from '@/types/global';
import { Axios } from '../axios'
import { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Room } from '@/types/room';
import { type Hotspot } from '@/types/hotspot';

export const useGetRoom = ({ id }: { id: string  }) => {
  const GET = async (): Promise<SuccessResponse<Room> | undefined> => {
    const req = await Axios.get(`/api/room/${id}`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['ROOM', id],
    queryFn: async () => GET(),
    enabled: id !== 'null' ? true : false
  })
}


export const useGetRoomHotspots = ({ id }: { id: string }) => {
  const GET = async (): Promise<SuccessResponse<Hotspot[]> | undefined> => {
    const req = await Axios.get(`/api/room/${id}/hotspots`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['HOTSPOTS', id],
    queryFn: async () => GET(),
    enabled: id !== 'null' ? true : false
  })
}

export const useCreateRoom = () => {
  type Payload = {
    tour_id: number;
    name: string;
    image_url: string
  }

  const queryClient = useQueryClient()

  const POST = async (payload: Payload) => {

    const formData = new FormData()
    formData.append('tour_id', String(payload.tour_id))
    formData.append('name', String(payload.name))
    formData.append('image_url', String(payload.image_url))

    const req = await Axios.post('/api/room', formData)

    return req.data
  }

  return useMutation<SuccessResponse<Room>, AxiosError<ErrorResponse>, Payload>({
    mutationFn: POST,
    onSuccess: () => queryClient.invalidateQueries(['ROOMS'])
  })
}

export const useUpdateRoom = () => {
  type Params = {
    room_id: number;
    name: string;
  }

  const queryClient = useQueryClient()

  const PATCH = async ({ room_id, name }: Params) => {
    const req = await Axios.patch(`/api/room/${room_id}`, { name })
    return req.data
  }

  return useMutation<SuccessResponse<unknown>, AxiosError<ErrorResponse>, Params>({
    mutationFn: PATCH,
    onSuccess: () => queryClient.invalidateQueries(['ROOM'])
  })
}








