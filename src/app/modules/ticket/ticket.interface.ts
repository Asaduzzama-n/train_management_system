import { Model, Types } from 'mongoose'

export type ITicket = {
  trainId: Types.ObjectId
  userId: Types.ObjectId
  fare?: number
  purchaseDate: Date
  status: 'active' | 'cancelled'
  journeyDate: Date
}

export type ITicketModel = Model<ITicket, Record<string, unknown>>

export interface ITicketFilters {
  searchTerm?: string
  minFare?: number
  maxFare?: number
  userId?: string
  trainId?: string
}
