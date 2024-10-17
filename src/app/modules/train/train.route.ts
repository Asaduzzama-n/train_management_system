import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { TrainValidation } from './train.validation'
import { TrainController } from './train.controller'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../interfaces/user'

const router = express.Router()

router.get('/schedules', TrainController.getAllSchedules)
router.get('/schedules/:id', TrainController.getSchedulesByTrainId)

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TrainValidation.createTrainZodSchema),
  TrainController.createTrain,
)

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TrainValidation.updateTrainZodSchema),
  TrainController.updateTrain,
)
router.patch(
  '/add-stops/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  TrainController.addStopsToTrain,
)

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), TrainController.deleteTrain)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  TrainController.getSingleTrain,
)

router.get('/', TrainController.getAllTrain)

export const TrainRoutes = router
