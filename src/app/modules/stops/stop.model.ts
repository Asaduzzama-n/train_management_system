import { model, Schema } from 'mongoose'
import { IStop, IStopModel } from './stop.interface'

export const StopSchema = new Schema<
  IStop,
  Record<string, unknown>,
  IStopModel
>(
  {
    stationId: { type: Schema.Types.ObjectId, ref: 'Station', required: true },
    trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Stop = model<IStop, IStopModel>('Stop', StopSchema)
