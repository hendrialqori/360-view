import axios from 'axios'

const source = axios.CancelToken.source()

export const Axios = axios.create({
  baseURL: 'http://103.140.90.118:8000',
  timeout: 60000, // Mengatur batas waktu menjadi 1 menit (1 s = 5000 ms)
  cancelToken: source.token,
})
