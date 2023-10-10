import axios from 'axios'

const source = axios.CancelToken.source()

const ORIGIN = import.meta.env.VITE_ORIGIN;

export const Axios = axios.create({
  baseURL: ORIGIN,
  timeout: 60000, // Mengatur batas waktu menjadi 1 menit (1 s = 5000 ms)
  cancelToken: source.token,
})
