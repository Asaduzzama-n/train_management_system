import express from 'express'
import { TransactionController } from './transaction.controller'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../interfaces/user'

const router = express.Router()

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TransactionController.getSingleTransaction,
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TransactionController.getAllTransaction,
)

export const TransactionRoutes = router
