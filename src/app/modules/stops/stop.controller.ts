import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IStop } from './stop.interface'
import { StopService } from './stop.service'

const createStop = catchAsync(async (req, res) => {
  const { ...stopData } = req.body
  const result = await StopService.createStop(stopData)

  sendResponse<IStop>(res, {
    statusCode: 200,
    success: true,
    message: 'Stop created successfully!',
    data: result,
  })
})

const updateStop = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...stopData } = req.body
  const result = await StopService.updateStop(id, stopData)

  sendResponse<IStop>(res, {
    statusCode: 200,
    success: true,
    message: 'Stop updated successfully!',
    data: result,
  })
})

const getAllStop = catchAsync(async (req, res) => {
  const result = await StopService.getAllStop()

  sendResponse<IStop[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Stops retrieved successfully!',
    data: result,
  })
})

const getSingleStop = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await StopService.getSingleStop(id)

  sendResponse<IStop>(res, {
    statusCode: 200,
    success: true,
    message: 'Stop retrieved successfully!',
    data: result,
  })
})

const deleteStop = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StopService.deleteStop(id)

  sendResponse<IStop>(res, {
    statusCode: 200,
    success: true,
    message: 'Stop deleted successfully!',
    data: result,
  })
})

export const StopController = {
  createStop,
  updateStop,
  getAllStop,
  getSingleStop,
  deleteStop,
}
