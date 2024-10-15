import mongoose from 'mongoose'
import { IErrorMessage, IErrorResponse } from '../interfaces/error'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IErrorResponse => {
  const errors: IErrorMessage[] = Object.values(error.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
