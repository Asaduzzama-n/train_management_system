import express from 'express'
import { WalletController } from './wallet.controller'
import validateRequest from '../../middleware/validateRequest'
import { WalletValidation } from './wallet.validation'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../interfaces/user'

const router = express.Router()

router.post(
  '/deposit',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(WalletValidation.depositWalletZodSchema),
  WalletController.depositBalance,
)

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  WalletController.getUserWallet,
)

export const walletRoutes = router
