import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { StationValidation } from './station.validation'
import { StationController } from './station.controller'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../interfaces/user'

const router = express.Router()

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(StationValidation.createStationZodSchema),
  StationController.createStation,
)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(StationValidation.updateStationZodSchema),
  StationController.updateStation,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  StationController.deleteStation,
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  StationController.getSingleStation,
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  StationController.getAllStation,
)

export const StationRoutes = router
