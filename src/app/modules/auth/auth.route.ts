import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
)

router.post(
  '/login',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.userLogin,
)

router.get('/refresh-token', AuthController.refreshToken)

export const AuthRoutes = router
