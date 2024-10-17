import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ITrain } from './train.interface'
import { Train } from './train.model'
import { Schedule } from './schedule/schedule.model'
import { ITrainSchedule } from './schedule/schedule.interface'

const createTrain = async (payload: ITrain): Promise<ITrain | null> => {
  const train = await Train.create(payload)
  if (!train)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create train.')

  return train
}

const getAllTrain = async (): Promise<ITrain[] | null> => {
  const trains = await Train.find().populate({
    path: 'stops',
    populate: { path: 'stationId', select: 'name stationCode' },
    select: 'departureTime arrivalTime',
  })
  if (!trains)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieved trains.')

  return trains
}

const getAllSchedules = async (): Promise<ITrainSchedule[] | null> => {
  const schedules = await Schedule.find().populate({
    path: 'stops trainId',
    populate: { path: 'stationId trainId', select: 'name stationCode' },
    select: 'departureTime arrivalTime',
  })
  if (!schedules)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieved trains.')

  return schedules
}

const getSchedulesByTrainId = async (
  trainId: string,
): Promise<ITrainSchedule[] | null> => {
  const schedules = await Schedule.find({ trainId }).populate({
    path: 'stops trainId',
    populate: { path: 'stationId trainId', select: 'name stationCode' },
    select: 'departureTime arrivalTime',
  })
  if (!schedules)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieved trains.')

  return schedules
}

const getSingleTrain = async (id: string): Promise<ITrain | null> => {
  const train = await Train.findOne({ _id: id }).populate({
    path: 'stops',
    populate: { path: 'stationId', select: 'name stationCode' },
    select: 'departureTime arrivalTime',
  })
  if (!train)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieved train.')

  return train
}
const updateTrain = async (
  id: string,
  payload: Partial<ITrain>,
): Promise<ITrain | null> => {
  const updatedTrain = await Train.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  if (!updatedTrain)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update train.')

  return updatedTrain
}

const addStopsToTrain = async (
  id: string,
  stopIds: string[],
): Promise<ITrain | null> => {
  if (!Array.isArray(stopIds) || stopIds.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Stop IDs must be a non-empty array.',
    )
  }

  const updatedTrain = await Train.findOneAndUpdate(
    { _id: id },
    { $addToSet: { stops: { $each: stopIds } } }, // Add stops using $addToSet to avoid duplicates
    { new: true }, // Return the updated document
  )

  if (!updatedTrain) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add stops to train.')
  }

  return updatedTrain
}

const deleteTrain = async (id: string): Promise<ITrain | null> => {
  const deletedTrain = await Train.findOneAndDelete({ _id: id })
  if (!deletedTrain)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete train.')

  return deletedTrain
}

export const TrainService = {
  createTrain,
  getAllTrain,
  getSingleTrain,
  updateTrain,
  deleteTrain,
  getAllSchedules,
  getSchedulesByTrainId,
  addStopsToTrain,
}
