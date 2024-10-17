import { Model, Types } from 'mongoose'

export type ITrainSchedule = {
  trainId: Types.ObjectId
  journeyDate: Date
  stops: Types.ObjectId[]
}

export type ITrainSchedules = Model<ITrainSchedule>
