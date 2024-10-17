import { model, Schema } from 'mongoose'
import { ITrainSchedule } from './schedule.interface'

export const ScheduleSchema = new Schema<ITrainSchedule>(
  {
    trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
    journeyDate: { type: Date, required: true },
    stops: [{ type: Schema.Types.ObjectId, ref: 'Station', required: true }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Schedule = model<ITrainSchedule>('Schedule', ScheduleSchema)
