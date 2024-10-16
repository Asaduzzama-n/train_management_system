import express from 'express'
import { TransactionController } from './transaction.controller'

const router = express.Router()

router.get('/:id', TransactionController.getSingleTransaction)
router.get('/', TransactionController.getAllTransaction)

export const TransactionRoutes = router
