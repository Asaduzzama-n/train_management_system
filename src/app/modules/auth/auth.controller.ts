import httpStatus from 'http-status'
import config from '../../../config'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from '../user/user.interface'
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface'
import { AuthService } from './auth.service'

const createUser = catchAsync(async (req, res) => {
  const { ...userData } = req.body
  const result = await AuthService.createUser(userData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})

const userLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const result = await AuthService.userLogin(email, password)

  const { refreshToken, ...others } = result as IUserLoginResponse

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await AuthService.refreshToken(refreshToken)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token fetched successfully!',
    data: result!,
  })
})

export const AuthController = {
  createUser,
  userLogin,
  refreshToken,
}
