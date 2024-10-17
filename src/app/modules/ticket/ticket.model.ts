import { model, Schema } from 'mongoose'
import { ITicket, ITicketModel } from './ticket.interface'

export const TicketSchema = new Schema<ITicket, Record<string, unknown>>(
  {
    trainId: { type: Schema.Types.ObjectId, ref: 'Train', required: true },
    fare: { type: Number, required: true },
    journeyDate: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    purchaseDate: { type: Date, required: true, default: Date.now() },
    startStationId: {
      type: Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    endStationId: {
      type: Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Ticket = model<ITicket, ITicketModel>('Ticket', TicketSchema)
