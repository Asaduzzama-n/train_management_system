import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { WalletService } from './wallet.service'

const depositBalance = catchAsync(async (req, res) => {
  const { ...depositData } = req.body

  const result = await WalletService.depositBalance(depositData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Balance deposited successfully!',
    data: result,
  })
})

const getUserWallet = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await WalletService.getUserWallet(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wallet retrieved successfully!',
    data: result,
  })
})

export const WalletController = {
  depositBalance,
  getUserWallet,
}
