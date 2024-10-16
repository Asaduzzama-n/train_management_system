import { model, Schema } from 'mongoose'
import { IStation, IStationModel } from './station.interface'

export const stationSchema = new Schema<
  IStation,
  Record<string, unknown>,
  IStationModel
>(
  {
    name: { type: String, required: true },
    stationCode: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Station = model<IStation, IStationModel>('Station', stationSchema)
