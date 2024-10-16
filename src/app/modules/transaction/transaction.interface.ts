import { Model, Types } from 'mongoose'

type TransactionType = 'ticket' | 'deposit'

export type ITransaction = {
  amount: number
  walletId: Types.ObjectId
  transactionType: TransactionType
  transactionDate: Date
  ticketId: Types.ObjectId | null
  userId: Types.ObjectId
}

export type ITransactionModel = Model<ITransaction, Record<string, unknown>>
