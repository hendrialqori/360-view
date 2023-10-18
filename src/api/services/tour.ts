import { ErrorResponse, SuccessResponse } from '@/types/global';
import { Axios } from '../axios'
import { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Tour } from '@/types/tour';
import { type Room } from '@/types/room';

export const useGetTour = ({ tour_id }: { tour_id: string }) => {

  const GET = async (): Promise<SuccessResponse<Tour> | undefined> => {
    const req = await Axios.get(`/api/tour/${tour_id}`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['TOUR'],
    queryFn: async () => GET(),
  })
}

export const useGetTours = () => {

  const GET = async (): Promise<SuccessResponse<Tour[]> | undefined> => {
    const req = await Axios.get(`/api/tours`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['TOURS'],
    queryFn: async () => GET(),
  })
}

export const useGetTourRooms = ({ id }: { id: string }) => {
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
    id: string;
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
    tour_id: string;
    name: string
  }

  const queryClient = useQueryClient()

  const PUT = async (payload: Payload) => {

    const req = await Axios.put(`/api/tour/${payload.tour_id}`, { name: payload.name })
    return req.data
  }

  return useMutation<SuccessResponse<unknown>, AxiosError, Payload>({
    mutationFn: PUT,
    onSuccess: () => queryClient.invalidateQueries(['TOUR'])
  })
}


export const useDeleteTour = () => {
  type Params = {
    tour_id: string;
  }

  const queryClient = useQueryClient()

  const DELETE = async ({ tour_id }: Params) => {

    const req = await Axios.delete(`/api/tour/${tour_id}`)

    return req.data
  }

  return useMutation<SuccessResponse<unknown>, AxiosError<ErrorResponse>, Params>({
    mutationFn: DELETE,
    onSuccess: () => queryClient.invalidateQueries(['TOURS'])
  })
}



