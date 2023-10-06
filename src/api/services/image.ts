import { ErrorResponse, SuccessResponse } from '@/types/global';
import { Axios } from '../axios'
import { AxiosError } from 'axios';
import { type Image } from '@/types/image'
import { useQuery } from '@tanstack/react-query';


export const useGetImages = () => {
  const GET = async (): Promise<SuccessResponse<Image[]> | undefined> => {
    const req = await Axios.get(`/api/photos`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['IMAGES'],
    queryFn: async () => GET(),
  })

}




