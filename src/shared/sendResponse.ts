import { Response } from 'express'

type IApiResponse<T> = {
  statusCode: number
  message: string
  data?: T
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  }
  res.status(data.statusCode).json(responseData)
}

export default sendResponse
