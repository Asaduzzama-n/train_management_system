import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { StopValidation } from './stop.validation'
import { StopController } from './stop.controller'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../interfaces/user'

const router = express.Router()

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(StopValidation.createStopZodSchema),
  StopController.createStop,
)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), StopController.getSingleStop)

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), StopController.updateStop)

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), StopController.deleteStop)

router.get('/', auth(ENUM_USER_ROLE.ADMIN), StopController.getAllStop)

export const StopRoutes = router
