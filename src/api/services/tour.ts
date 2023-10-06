import { ErrorResponse, SuccessResponse } from '@/types/global';
import { Axios } from '../axios'
import { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Room } from '@/types/room';

export const useGetTourRooms = ({ id }: { id: number }) => {
  const GET = async (): Promise<SuccessResponse<Room[]> | undefined> => {
    const req = await Axios.get(`/api/tour/${id}/rooms`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['ROOMS'],
    queryFn: async () => GET(),
  })
}

type Payload = {
  name: string;
}

export const useCreateTour = () => {
  type Res = {
    id: number;
    name: string
  }

  const POST = async (payload: Payload) => {
    const req = await Axios.post('/api/tour', payload)
    return req.data
  }

  return useMutation<SuccessResponse<Res>, AxiosError, Payload>({
    mutationFn: POST,
  })
}

export const useUpdateTour = () => {

  type Payload = {
    tour_id: number;
    name: string
  }

  const queryClient = useQueryClient()

  const PATCH = async (payload: Payload) => {

    const formData = new FormData()
    formData.append('name', payload.name)

    const req = await Axios.patch(`/api/tour/${payload.tour_id}`, formData)
    return req.data
  }

  return useMutation<SuccessResponse<unknown>, AxiosError, Payload>({
    mutationFn: PATCH,
    onSuccess: () => queryClient.invalidateQueries(['TOUR'])
  })
}


