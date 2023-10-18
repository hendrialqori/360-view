import { ErrorResponse, SuccessResponse } from '@/types/global';
import { Axios } from '../axios'
import { AxiosError } from 'axios';
import { type Image } from '@/types/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const intervalMs = import.meta.env.VITE_FETCH_INTERVAL

export const useGetImages = () => {
  const GET = async (): Promise<SuccessResponse<Image[]> | undefined> => {
    const req = await Axios.get(`/api/photos`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['IMAGES'],
    queryFn: async () => GET(),
    refetchInterval: Number(intervalMs)
  })
}

export const useDeleteImage = () => {
  type Params = {
    image_id: string;
  }

  const queryClient = useQueryClient()

  const DELETE = async ({ image_id }: Params) => {

    const req = await Axios.delete(`/api/photo/${image_id}`)

    return req.data
  }

  return useMutation<SuccessResponse<unknown>, AxiosError<ErrorResponse>, Params>({
    mutationFn: DELETE,
    onSuccess: () => queryClient.invalidateQueries(['IMAGES'])
  })
}



