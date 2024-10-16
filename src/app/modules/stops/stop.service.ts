import { IStop } from './stop.interface'
import { Stop } from './stop.model'

const createStop = async (payload: IStop): Promise<IStop | null> => {
  const stop = await Stop.create(payload)
  if (!stop) throw new Error('Failed to create stop')
  return stop
}
const getSingleStop = async (id: string): Promise<IStop | null> => {
  const stop = await Stop.findById(id).populate('stationId trainId')
  if (!stop) throw new Error('Failed to retrieve stop')
  return stop
}
const getAllStop = async (): Promise<IStop[] | null> => {
  const stop = await Stop.find().populate('stationId trainId')
  if (!stop) throw new Error('Failed to retrieve stops')
  return stop
}
const updateStop = async (
  id: string,
  payload: Partial<IStop>,
): Promise<IStop | null> => {
  const stop = await Stop.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('stationId trainId')
  if (!stop) throw new Error('Failed to update stop')
  return stop
}
const deleteStop = async (id: string): Promise<IStop | null> => {
  const stop = await Stop.findByIdAndDelete(id)
  if (!stop) throw new Error('Failed to delete stop')
  return stop
}

export const StopService = {
  createStop,
  getSingleStop,
  getAllStop,
  updateStop,
  deleteStop,
}
