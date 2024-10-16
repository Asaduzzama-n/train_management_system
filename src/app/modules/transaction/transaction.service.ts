import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IWallet } from '../wallet/wallet.interface'
import { ITransaction } from './transaction.interface'
import { Transaction } from './transaction.model'

const getAllTransaction = async (): Promise<ITransaction[]> => {
  const transactions = await Transaction.find().populate('walletId userId')
  if (!transactions) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to retrieve transactions',
    )
  }
  return transactions
}

const getSingleTransaction = async (
  id: string,
): Promise<ITransaction | null> => {
  const transaction = await Transaction.findById(id).populate('walletId userId')
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction does not exists!')
  }
  return transaction
}

export const TransactionService = {
  getAllTransaction,
  getSingleTransaction,
}
