import express from 'express'
import { WalletController } from './wallet.controller'
import validateRequest from '../../middleware/validateRequest'
import { WalletValidation } from './wallet.validation'

const router = express.Router()

router.post(
  '/deposit',
  validateRequest(WalletValidation.depositWalletZodSchema),
  WalletController.depositBalance,
)

router.get('/:id', WalletController.getUserWallet)

export const walletRoutes = router
