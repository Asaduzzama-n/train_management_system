import { ZodError } from 'zod'
import { IErrorMessage, IErrorResponse } from '../interfaces/error'

const handleZodError = (error: ZodError): IErrorResponse => {
  const errors: IErrorMessage[] = error.issues.map(issue => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
