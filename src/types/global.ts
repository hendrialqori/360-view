export type SuccessResponse<T> = {
  success: boolean
  data: T
  message: string
  metadata: []
}

export type ErrorResponse = {
  success: boolean
  message: string
  metadata: []
}
