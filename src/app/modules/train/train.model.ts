import { model, Schema } from 'mongoose'
import { ITrain, ITrainModel } from './train.interface'

export const stationSchema = new Schema<
  ITrain,
  Record<string, unknown>,
  ITrainModel
>(
  {
    trainName: { type: String, required: true },
    trainCode: { type: String, required: true, unique: true },
    seats: { type: Number, required: true },
    stops: [{ type: Schema.Types.ObjectId, ref: 'Stop' }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Train = model<ITrain, ITrainModel>('Train', stationSchema)
