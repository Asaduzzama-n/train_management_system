import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { TicketValidation } from './ticket.validation'
import { TicketController } from './ticket.controller'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../interfaces/user'

const router = express.Router()

router.post(
  '/purchase',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(TicketValidation.purchaseTicketZodSchema),
  TicketController.purchaseTicket,
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TicketController.getSingleTicket,
)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  validateRequest(TicketValidation.updateTicketZodSchema),
  TicketController.updateTicket,
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TicketController.getAllTicket,
)

export const TicketRoutes = router
