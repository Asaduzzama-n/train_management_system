import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ITrain } from './train.interface'
import { Train } from './train.model'

const createTrain = async (payload: ITrain): Promise<ITrain | null> => {
  const train = await Train.create(payload)
  if (!train)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create train.')

  return train
}

const getAllTrain = async (): Promise<ITrain[] | null> => {
  const train = await Train.find()
  if (!train)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieved trains.')

  return train
}

const getSingleTrain = async (id: string): Promise<ITrain | null> => {
  const train = await Train.findOne({ _id: id })
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
}
