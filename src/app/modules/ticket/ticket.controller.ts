import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { TicketService } from './ticket.service'

const purchaseTicket = catchAsync(async (req, res) => {
  const { id } = req?.user!

  const { ...ticketData } = req.body

  const updatedDepositData = {
    ...ticketData,
    userId: id,
  }

  const result = await TicketService.purchaseTicket(updatedDepositData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket purchased successfully!',
    data: result,
  })
})

const getSingleTicket = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TicketService.getSingleTicket(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket retrieved successfully!',
    data: result,
  })
})

const getAllTicket = catchAsync(async (req, res) => {
  const result = await TicketService.getAllTicket()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tickets retrieved successfully!',
    data: result,
  })
})

const updateTicket = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...updatedData } = req.body
  const result = await TicketService.updateTicket(id, updatedData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket updated successfully!',
    data: result,
  })
})

export const TicketController = {
  purchaseTicket,
  getSingleTicket,
  getAllTicket,
  updateTicket,
}
