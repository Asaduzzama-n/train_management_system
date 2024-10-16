import { Model, Types } from 'mongoose'

export type IStop = {
  stationId: Types.ObjectId
  trainId: Types.ObjectId
  departureTime: Date
  arrivalTime: Date
}

export type IStopModel = Model<IStop, Record<string, unknown>>
