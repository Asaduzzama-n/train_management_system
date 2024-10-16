import { Response, Request, NextFunction } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import config from '../../config'
import { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../helpers/jwtHelpers'

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwtSecret as Secret,
      )
      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
      }
      req.user = verifiedUser
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden!')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
