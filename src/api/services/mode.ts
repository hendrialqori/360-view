import { ErrorResponse, SuccessResponse } from '@/types/global';
import { Axios } from '../axios'
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query'


export const useGetMode = () => {

  type Mode = {
    app_mode: 'client' | 'server'
  }

  const GET = async (): Promise<SuccessResponse<Mode> | undefined> => {
    const req = await Axios.get(`/api/client/mode`)
    return req.data
  }

  return useQuery<Awaited<ReturnType<typeof GET>>, AxiosError<ErrorResponse>>({
    queryKey: ['MODE'],
    queryFn: async () => GET(),
  })
}