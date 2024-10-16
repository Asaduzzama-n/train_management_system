import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { TransactionService } from './transaction.service'

const getAllTransaction = catchAsync(async (req, res) => {
  const result = await TransactionService.getAllTransaction()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transactions retrieved successfully!',
    data: result,
  })
})

const getSingleTransaction = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TransactionService.getSingleTransaction(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction retrieved successfully!',
    data: result,
  })
})

export const TransactionController = {
  getAllTransaction,
  getSingleTransaction,
}
