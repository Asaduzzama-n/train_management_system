import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import mongoose from 'mongoose'
import { Wallet } from '../wallet/wallet.model'
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createUser = async (payload: IUser) => {
  const { email } = payload

  const userObj = new User()
  const isUserExists = await userObj.isUserExists(email)
  if (isUserExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const wallet = await Wallet.create(
      [{ balance: 0, userId: new mongoose.Types.ObjectId() }],
      {
        session,
      },
    )

    const user = await User.create([{ ...payload, walletId: wallet[0]._id }], {
      session,
    })

    wallet[0].userId = user[0]._id
    await wallet[0].save({ session })

    await session.commitTransaction()

    return user[0]
  } catch (error) {
    await session.abortTransaction()
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create user')
  } finally {
    session.endSession()
  }
}

const userLogin = async (
  email: string,
  password: string,
): Promise<IUserLoginResponse | null> => {
  const userObj = new User()
  const isUserExist = await userObj.isUserExists(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!')
  }

  const isPasswordMatched = await userObj.isPasswordMatched(
    password,
    isUserExist.password,
  )

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!')
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      email: email,
      role: isUserExist.role,
    },
    config.jwt.jwtSecret as Secret,
    config.jwt.jwtExpiresIn as string,
  )

  const refreshToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      email: email,
      role: isUserExist.role,
    },
    config.jwt.jwtRefreshSecret as Secret,
    config.jwt.jwtRefreshExpiresIn as string,
  )

  const userData = await User.findOne(
    { _id: isUserExist?._id },
    { name: 1, email: 1, userBooks: 1, image: 1 },
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (
  token: string,
): Promise<IRefreshTokenResponse | null> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.jwtRefreshSecret as Secret,
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { email } = verifiedToken

  const userObj = new User()
  const isUserExist = await userObj.isUserExists(email)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.jwtSecret as Secret,
    config.jwt.jwtExpiresIn as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = { createUser, userLogin, refreshToken }
