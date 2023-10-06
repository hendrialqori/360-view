import { ErrorResponse, SuccessResponse } from '@/types/global';
import { Axios } from '../axios'
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateHostpot = () => {
  type Payload = {
    tour_id: number;
    room_id: number;
    pitch: number;
    yaw: number;
    type: 'custom' | 'info'
    text?: string
  }

  const queryClient = useQueryClient()

  const POST = async (payload: Payload) => {

    const formData = new FormData()
    formData.append('tour_id', String(payload.tour_id))
    formData.append('room_id', String(payload.room_id))
    formData.append('pitch', String(payload.pitch))
    formData.append('yaw', String(payload.yaw))
    formData.append('type', String(payload.type))
    formData.append('text', String(payload.text ?? ''))

    const req = await Axios.post('/api/hotspot', formData)

    return req.data
  }

  return useMutation<SuccessResponse<Payload>, AxiosError<ErrorResponse>, Payload>({
    mutationFn: POST,
    onSuccess: () => queryClient.invalidateQueries(['HOTSPOTS'])
  })
}

export const useUpdateHotspot = () => {
  type Params = {
    hostpot_id: number;
    payload: FormData
  }

  const queryClient = useQueryClient()

  const PUT = async (params: Params) => {

    const req = await Axios.post(`/api/hotspot/${params.hostpot_id}`,
      params.payload, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })

    return req.data
  }

  return useMutation<SuccessResponse<unknown>, AxiosError<ErrorResponse>, Params>({
    mutationFn: PUT,
    onSuccess: () => queryClient.invalidateQueries(['HOTSPOTS'])
  })
}

export const useDeleteHotspot = () => {
  type Params = {
    hostpot_id: number;
  }

  const queryClient = useQueryClient()

  const DELETE = async ({ hostpot_id }: Params) => {

    const req = await Axios.delete(`/api/hotspot/${hostpot_id}`)

    return req.data
  }

  return useMutation<SuccessResponse<unknown>, AxiosError<ErrorResponse>, Params>({
    mutationFn: DELETE,
    onSuccess: () => queryClient.invalidateQueries(['HOTSPOTS'])
  })
}