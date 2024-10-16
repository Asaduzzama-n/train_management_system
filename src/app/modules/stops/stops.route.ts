import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { StopValidation } from './stop.validation'
import { StopController } from './stop.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(StopValidation.createStopZodSchema),
  StopController.createStop,
)
router.get('/:id', StopController.getSingleStop)

router.patch('/:id', StopController.updateStop)

router.patch('/:id', StopController.deleteStop)

router.get('/', StopController.getAllStop)

export const StopRoutes = router
