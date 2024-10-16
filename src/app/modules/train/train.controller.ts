import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ITrain } from './train.interface'
import { TrainService } from './train.service'

const createTrain = catchAsync(async (req, res) => {
  const { ...trainData } = req.body
  const result = await TrainService.createTrain(trainData)

  sendResponse<ITrain>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train created successfully!',
    data: result,
  })
})

const getAllTrain = catchAsync(async (req, res) => {
  const result = await TrainService.getAllTrain()

  sendResponse<ITrain[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trains retrieved successfully!',
    data: result,
  })
})

const getSingleTrain = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TrainService.getSingleTrain(id)

  sendResponse<ITrain>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train retrieved successfully!',
    data: result,
  })
})

const updateTrain = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...updatedData } = req.body
  const result = await TrainService.updateTrain(id, updatedData)

  sendResponse<ITrain>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train updated successfully!',
    data: result,
  })
})

const addStopsToTrain = catchAsync(async (req, res) => {
  const { id } = req.params
  const { stopsId } = req.body
  const result = await TrainService.addStopsToTrain(id, stopsId)

  sendResponse<ITrain>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train updated successfully!',
    data: result,
  })
})

const deleteTrain = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TrainService.deleteTrain(id)

  sendResponse<ITrain>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train deleted successfully!',
    data: result,
  })
})

export const TrainController = {
  createTrain,
  getAllTrain,
  getSingleTrain,
  updateTrain,
  deleteTrain,
  addStopsToTrain,
}
