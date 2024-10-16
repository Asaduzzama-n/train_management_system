import { model, now, Schema } from 'mongoose'
import { ITransaction, ITransactionModel } from './transaction.interface'

export const TransactionSchema = new Schema<
  ITransaction,
  Record<string, unknown>
>(
  {
    amount: { type: Number, required: true },
    walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    transactionType: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transactionDate: { type: Date, default: now() },
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Transaction = model<ITransaction, ITransactionModel>(
  'Transaction',
  TransactionSchema,
)
