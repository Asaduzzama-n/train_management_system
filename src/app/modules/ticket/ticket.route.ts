import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { TicketValidation } from './ticket.validation'
import { TicketController } from './ticket.controller'

const router = express.Router()

router.post(
  '/purchase',
  validateRequest(TicketValidation.purchaseTicketZodSchema),
  TicketController.purchaseTicket,
)
router.get('/:id', TicketController.getSingleTicket)
router.patch(
  '/:id',
  validateRequest(TicketValidation.updateTicketZodSchema),
  TicketController.updateTicket,
)
router.get('/', TicketController.getAllTicket)

export const TicketRoutes = router
