import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IStation } from './station.interface'
import { StationService } from './station.service'

const createStation = catchAsync(async (req, res) => {
  const { ...stationData } = req.body
  const result = await StationService.createStation(stationData)

  sendResponse<IStation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station created successfully!',
    data: result,
  })
})

const getAllStation = catchAsync(async (req, res) => {
  const result = await StationService.getAllStation()

  sendResponse<IStation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stations retrieved successfully!',
    data: result,
  })
})

const getSingleStation = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StationService.getSingleStation(id)

  sendResponse<IStation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station retrieved successfully!',
    data: result,
  })
})

const updateStation = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...updatedData } = req.body
  const result = await StationService.updateStation(id, updatedData)

  sendResponse<IStation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station updated successfully!',
    data: result,
  })
})

const deleteStation = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await StationService.deleteStation(id)

  sendResponse<IStation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station deleted successfully!',
    data: result,
  })
})

export const StationController = {
  createStation,
  getAllStation,
  getSingleStation,
  updateStation,
  deleteStation,
}
