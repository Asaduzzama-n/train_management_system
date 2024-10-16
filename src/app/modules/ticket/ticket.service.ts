import { ITicket, ITicketFilters } from './ticket.interface'
import { Ticket } from './ticket.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { Train } from '../train/train.model'
import mongoose from 'mongoose'
import { checkTicketAvailability } from './utils'
import { Wallet } from '../wallet/wallet.model'
import { Transaction } from '../transaction/transaction.model'

const purchaseTicket = async (payload: ITicket): Promise<ITicket | null> => {
  const { trainId, journeyDate, userId } = payload

  const train = await Train.findById(payload.trainId).lean()
  if (!train)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Train data does not exists!')

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    //Check if the ticket is available to purchase or not
    const ticketAvailability = await checkTicketAvailability(
      trainId,
      journeyDate,
      train.seats,
    )

    if (!ticketAvailability) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Ticket not available')
    }

    const fare = 100

    const wallet = await Wallet.findOne({ userId })
    if (!wallet || wallet.balance < fare) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient wallet balance')
    }

    await wallet.updateOne({ $inc: { balance: -fare } })

    const result = await Ticket.create({
      ...payload,
      fare,
      walletId: wallet?._id,
    })

    await Transaction.create({
      amount: fare,
      walletId: wallet?._id,
      userId,
      transactionType: 'ticket',
      transactionDate: Date.now(),
      ticketId: result?._id,
    })

    await session.commitTransaction()
    return result
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
}

export const getAllTicket = async (): Promise<ITicket[] | null> => {
  const ticket = await Ticket.find().populate('trainId userId')
  if (!ticket)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ticket data does not exists!')
  return ticket
}

const getSingleTicket = async (id: string): Promise<ITicket | null> => {
  const ticket = await Ticket.findById(id).populate('trainId userId')
  if (!ticket)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ticket data does not exists!')
  return ticket
}

const updateTicket = async (
  id: string,
  payload: Partial<ITicket>,
): Promise<ITicket | null> => {
  const ticket = await Ticket.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  if (!ticket)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update ticket')
  return ticket
}

export const TicketService = {
  purchaseTicket,
  getSingleTicket,
  getAllTicket,
  updateTicket,
}
