import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.options('*', cors())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())

app.use('/api/v1', router)

app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Requested URL not found.',
  })
})

export default app
