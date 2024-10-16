import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IErrorMessage } from '../../interfaces/error'
import handleCastError from '../../errors/handleCastError'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import handleZodError from '../../errors/handleZodError'
import { ZodError } from 'zod'

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.env === 'development'
    ? console.log(`Inside Global Error Handler 🌏: `, error)
    : null

  let statusCode = error.status || 500
  let message = error.message || 'Something went wrong'
  let errorMessages: IErrorMessage[] = []

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.status
    message = error?.message
    errorMessages = error.message ? [{ path: '', message: error?.message }] : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error.message ? [{ path: '', message: error?.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
