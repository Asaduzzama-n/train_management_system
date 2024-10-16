import { Model, Types } from 'mongoose'

export type ITrain = {
  trainName: string
  trainCode: string
  seats: number
  stops: Types.ObjectId[]
}

export type ITrainModel = Model<ITrain, Record<string, unknown>>
