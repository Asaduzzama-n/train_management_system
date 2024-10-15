import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { StationValidation } from './station.validation'
import { StationController } from './station.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(StationValidation.createStationZodSchema),
  StationController.createStation,
)
router.patch(
  '/:id',
  validateRequest(StationValidation.updateStationZodSchema),
  StationController.updateStation,
)
router.delete('/:id', StationController.deleteStation)
router.get('/:id', StationController.getSingleStation)
router.get('/', StationController.getAllStation)

export const StationRoutes = router
