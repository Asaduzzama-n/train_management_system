import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { TrainValidation } from './train.validation'
import { TrainController } from './train.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(TrainValidation.createTrainZodSchema),
  TrainController.createTrain,
)
router.patch(
  '/:id',
  validateRequest(TrainValidation.updateTrainZodSchema),
  TrainController.updateTrain,
)
router.patch('/add-stops/:id', TrainController.addStopsToTrain)

router.delete('/:id', TrainController.deleteTrain)
router.get('/:id', TrainController.getSingleTrain)
router.get('/', TrainController.getAllTrain)

export const TrainRoutes = router
