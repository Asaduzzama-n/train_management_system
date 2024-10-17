import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IStation } from './station.interface'
import { Station } from './station.model'

const createStation = async (payload: IStation): Promise<IStation | null> => {
  const station = await Station.create(payload)
  if (!station)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create station.')

  return station
}

const getAllStation = async (): Promise<IStation[] | null> => {
  const station = await Station.find()
  if (!station)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieved stations.')

  return station
}

const getSingleStation = async (id: string): Promise<IStation | null> => {
  const station = await Station.findOne({ _id: id })
  if (!station)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Station does not exist.')

  return station
}
const updateStation = async (
  id: string,
  payload: Partial<IStation>,
): Promise<IStation | null> => {
  const updatedStation = await Station.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  if (!updatedStation)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update station.')

  return updatedStation
}

const deleteStation = async (id: string): Promise<IStation | null> => {
  const deletedStation = await Station.findOneAndDelete({ _id: id })
  if (!deletedStation)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete station.')

  return deletedStation
}

export const StationService = {
  createStation,
  getAllStation,
  getSingleStation,
  updateStation,
  deleteStation,
}
