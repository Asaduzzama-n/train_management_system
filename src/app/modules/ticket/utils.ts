import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { Ticket } from './ticket.model'
import { Types } from 'mongoose'

export const checkTicketAvailability = async (
  trainId: Types.ObjectId,
  journeyDate: Date,
  trainSeats: number,
) => {
  const tickets = await Ticket.find({
    trainId: trainId,
    journeyDate: journeyDate,
  })

  if (!tickets) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No tickets found')
  }

  console.log(tickets.length, trainSeats)

  if (tickets.length >= trainSeats) {
    return false
  }

  return true
}
