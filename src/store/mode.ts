import { atom } from 'recoil'

export const mode = atom<'client' | 'server'>({
  key: 'mode',
  default: 'client'
})