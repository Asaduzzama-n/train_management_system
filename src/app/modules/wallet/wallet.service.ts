import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ITransaction } from '../transaction/transaction.interface'
import { IWallet } from './wallet.interface'
import { Wallet } from './wallet.model'
import mongoose from 'mongoose'
import { Transaction } from '../transaction/transaction.model'

const depositBalance = async (
  payload: ITransaction,
): Promise<IWallet | null> => {
  const { walletId, amount } = payload

  const wallet = await Wallet.findOne({ _id: walletId })

  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    wallet.balance += amount

    await wallet.save({ session })

    await Transaction.create(payload)

    await session.commitTransaction()

    return wallet
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    await session.endSession()
  }
}

const getUserWallet = async (id: string): Promise<IWallet | null> => {
  const wallet = await Wallet.findOne({ userId: id }).populate('userId')
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found')
  }
  return wallet
}

export const WalletService = {
  depositBalance,
  getUserWallet,
}
